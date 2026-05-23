const express = require('express');
const cors = require('cors');
const db = require('./db');
const { parse } = require('dotenv');

const app = express();


app.use(cors());

app.use(express.json());

app.get('/docentes', (req, res) => {
    const {
        cursor_id = '0', limite = '10', 
        nombre, correo, area_academica, dedicacion, titulo, anios_experiencia} = req.query;

    const cursorIdNum = parseInt(cursor_id, 10);
    const limiteNum = parseInt(limite, 10);

    if (Number.isNaN(cursorIdNum) || cursorIdNum < 0) {
        return res.status(400).json({error: 'cursor_id inválido'});
    }
    if (Number.isNaN(limiteNum) || limiteNum <= 0) {
        return res.status(400).json({error: 'limite inválido'});
    }

    let aniosFilterNum;
    if (anios_experiencia) {
        aniosFilterNum = parseInt(anios_experiencia, 10);
        if (Number.isNaN(aniosFilterNum) || aniosFilterNum < 0) {
            return res.status(400).json({error: 'anios_experiencia inválido'});
        }
    }

    let sqlQuery = 'SELECT * FROM docentes ' +
            'WHERE id > ? ';
    const queryParams = [cursorIdNum];

    if (nombre) {
        sqlQuery += 'AND nombre LIKE ? ';
        queryParams.push(`%${nombre}%`);
    }
    if (correo) {
        sqlQuery += 'AND correo LIKE ? ';
        queryParams.push(`%${correo}%`);
    }
    if (area_academica) {
        sqlQuery += 'AND area_academica LIKE ? ';
        queryParams.push(`%${area_academica}%`);
    }
    if (dedicacion) {
        sqlQuery += 'AND dedicacion LIKE ? ';
        queryParams.push(`%${dedicacion}%`);
    }
    if (titulo) {
        sqlQuery += 'AND titulo LIKE ? ';
        queryParams.push(`%${titulo}%`);
    }
    if (anios_experiencia) {
        sqlQuery += 'AND anios_experiencia >= ? ';
        queryParams.push(aniosFilterNum);
    }

    sqlQuery += 'ORDER BY id ASC ' +
            'LIMIT ?';

    db.query(sqlQuery, [...queryParams, limiteNum], (err, results) =>{
        if (err) {
            console.error('Error al obtener los docentes:', err);
            return res.status(500).json({error: 'Error al obtener los docentes'});
        }
        res.json(results);
    });
});

app.get('/docentes/:id', (req, res) => {

    const {id} = req.params;

    const sql = 'SELECT * FROM docentes WHERE id = ?';

    db.query(sql,[id], (err, results) =>{
        if (err) {
            return res.status(500).json({error: 'error al obtener el docente'});
        }
        if(!results.length){
            return res.status(404).json({error: 'Docente no encontrado'});
        }
        res.json(results[0]);
    });
});


app.post('/docentes',(req, res)=>{
    const {nombre, correo, telefono, titulo, area_academica, dedicacion, anios_experiencia} = req.body;

    if(!nombre?.trim() || !correo?.trim() || !telefono?.trim() || !titulo?.trim() || !area_academica?.trim() || !dedicacion?.trim() || !anios_experiencia?.trim()){

        return res.status(400).json({error: 'Todos los campos son requeridos'});
    }

    const anios = Number(anios_experiencia);

    if(Number.isNaN(anios) || anios < 0){
        return res.status(400).json({error: 'anios de experiencias invalidos'});
    }

    const sql = 'INSERT INTO docentes (nombre, correo, telefono, titulo, area_academica, dedicacion, anios_experiencia) VALUES(?,?,?,?,?,?,?)'; 

    db.query(sql, [nombre.trim(), correo.trim(),telefono.trim(),titulo.trim(), area_academica.trim(),dedicacion.trim(),anios], (err, result) => {
        if(err){
            return res.status(500).json({error: 'Error al guardar el docente'});
        }

        res.json({
            id: result.insertId,
            nombre: nombre.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
            titulo: titulo.trim(),
            area_academica: area_academica.trim(),
            dedicacion: dedicacion.trim(),
            anios_experiencia: anios,

        });
    });
});

app.put('/docentes/:id', (req, res) => {
    const {id} = req.params;
    const {nombre, correo, telefono, titulo, area_academica, dedicacion, anios_experiencia} = req.body;

    const anios = Number(anios_experiencia);

    if(Number.isNaN(anios) || anios < 0){
        return res.status(400).json({
            error: 'anios de experiencias invalidos'
        });
    }

    const sql = 'UPDATE docentes SET nombre=?, correo=?, telefono=?, titulo=?, area_academica=?, dedicacion=?, anios_experiencia=? WHERE id=?';

    db.query(
    sql,
    [
      nombre.trim(),
      correo.trim(),
      telefono.trim(),
      titulo.trim(),
      area_academica.trim(),
      dedicacion.trim(),
      anios,
      id
    ],
    (err) => {
        if (err){
          return res.status(500).json({error: 'Error al actualizar el docente'});
        }
        return res.json({message: 'Docente Actualizado correctamente'});
    });

});

app.delete('/docentes/:id', (req, res) => {
    const {id} = req.params;

    const sql = 'DELETE FROM docentes WHERE id=?';

    db.query(sql,[id], (err) =>{
        if (err){
          return res.status(500).json({error: 'Error al eliminar docente'});
        }
        return res.json({message: 'Docente eliminado'});
    });

});

app.listen(3001,() =>{
    console.log('servidor backend corriendo desde el puerto 3001')
})