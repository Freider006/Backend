const express = require("express")
const cors = require("cors")
const app = express()
const mysql = require("mysql")
const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'estudiantesweb',
    password: 'admin12345',
    database: 'cursoweb',
    
    port: 3306
})
connection.connect(err => {
    if (err) console.log("conexion", err);
    console.log("conectado a mysql")
});

app.use(cors())
app.use(express.json())


app.post('/crear', (req, res) => {
    const {asignatura,nota } = req.body;
    connection.query('INSERT INTO cordoba(asignatura,nota)VALUES(?,?)',
        [asignatura,nota], (err, result) => {
            if (err) console.log('Errores', err)
            res.send("Cliente agregado")
        })
})

app.get('/estudiantes', (req, res) => {
    connection.query('SELECT * FROM cordoba', (err, results) => {
        if (err) {
            console.log('Error al obtener los estudiantes', err);
            res.status(500).send('Error al obtener los estudiantes');
        } else {
            res.json(results);
        }
    });
});

app.delete('/delete-user/:id', (req, res) => {
    const {id} = req.params
    connection.query('DELETE FROM cordoba WHERE id = ?',
        [id], (req, respo) => {
            res.send('asignatura,eliminada con éxito'); 
        }
    )
})

app.put('/actualizar-nota/:id', (req, res) => {
    const { id } = req.params
    const { asignatura, nota } = req.body;

    connection.query(
        'UPDATE cordoba SET asignatura = ?, nota=? WHERE id = ?',
        [asignatura, nota, id],
        (err, result) => {
            if (err) {
                console.log('Error al actualizar asignatura,nota', err);
                return res.status(500).send('Error al actualizar asignatura,nota ');
            }

            if (result.affectedRows === 0) {
                return res.status(404).send('cordoba no encontrado');
            }

            res.send('asignatura,nota actualizado con éxito');
        }
    );
});


app.listen(3000, () => {
    console.log("corriendo en el puerto 3000");
})


