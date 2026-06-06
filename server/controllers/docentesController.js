const db = require('../db');

// GET all docentes with filters and pagination
exports.getAllDocentes = async (req, res) => {
    const {
        cursor_id = '0', limite = '10',
        nombre, correo, area_academica, dedicacion, titulo, anios_experiencia
    } = req.query;

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

    const filters = ['id > ?'];
    const filterParams = [];
    const totalCountFilters = [];

    if (nombre) {
        filters.push('nombre LIKE ?');
        filterParams.push(`%${nombre}%`);
        totalCountFilters.push('nombre LIKE ?');
    }
    if (correo) {
        filters.push('correo LIKE ?');
        filterParams.push(`%${correo}%`);
        totalCountFilters.push('correo LIKE ?');
    }
    if (area_academica) {
        filters.push('area_academica LIKE ?');
        filterParams.push(`%${area_academica}%`);
        totalCountFilters.push('area_academica LIKE ?');
    }
    if (dedicacion) {
        filters.push('dedicacion LIKE ?');
        filterParams.push(`%${dedicacion}%`);
        totalCountFilters.push('dedicacion LIKE ?');
    }
    if (titulo) {
        filters.push('titulo LIKE ?');
        filterParams.push(`%${titulo}%`);
        totalCountFilters.push('titulo LIKE ?');
    }
    if (anios_experiencia) {
        filters.push('anios_experiencia >= ?');
        filterParams.push(aniosFilterNum);
        totalCountFilters.push('anios_experiencia >= ?');
    }

    const whereClause = `WHERE ${filters.join(' AND ')}`;
    const countWhereClause = totalCountFilters.length > 0 ? `WHERE ${totalCountFilters.join(' AND ')}` : '';

    const sqlQuery = `SELECT * FROM docentes ${whereClause} ORDER BY id ASC LIMIT ?`;
    const countQuery = `SELECT COUNT(*) AS total FROM docentes ${countWhereClause}`;
    const beforeCursorQuery = `SELECT COUNT(*) AS beforeCount FROM docentes ${countWhereClause}${countWhereClause ? ' AND' : 'WHERE'} id <= ?`;

    try {
        const countRows = await dbQuery(countQuery, [...filterParams]);
        const totalDocentes = countRows?.[0]?.total || 0;
        const totalPaginas = totalDocentes === 0 ? 0 : Math.ceil(totalDocentes / limiteNum);

        let paginaActual = 1;
        if (cursorIdNum > 0 && totalDocentes > 0) {
            const beforeParams = [cursorIdNum, ...filterParams];
            const beforeRows = await dbQuery(beforeCursorQuery, beforeParams);
            const beforeCount = beforeRows?.[0]?.beforeCount || 0;
            paginaActual = Math.floor(beforeCount / limiteNum) + 1;
        }

        const results = await dbQuery(sqlQuery, [cursorIdNum, ...filterParams, limiteNum]);

        return res.json({
            totalDocentes,
            totalPaginas,
            paginaActual,
            docentes: results,
        });
    } catch (err) {
        console.error('Error al obtener los docentes:', err);
        return res.status(500).json({error: 'Error al obtener los docentes'});
    }
};

// GET single docente by ID
exports.getDocenteById = (req, res) => {
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
};

// CREATE docente
exports.createDocente = (req, res) => {
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
};

// UPDATE docente
exports.updateDocente = (req, res) => {
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
};

// DELETE docente
exports.deleteDocente = (req, res) => {
    const {id} = req.params;

    const sql = 'DELETE FROM docentes WHERE id=?';

    db.query(sql,[id], (err) =>{
        if (err){
          return res.status(500).json({error: 'Error al eliminar docente'});
        }
        return res.json({message: 'Docente eliminado'});
    });
};