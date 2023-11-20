const conexion = require('./conexionBDScaloneta');

const buscarPorId = async (idFutbolista) => {
    const consulta = `SELECT  dni, nombre, apellido, apodo, posicion, pieHabil, foto
     
    FROM futbolista 
    WHERE activo = 1 AND idFutbolista = ?`;

    const [futbolista] = await conexion.query(consulta, idFutbolista);
    return futbolista;
}

const buscarTodos = async () => {
    // el select incluye un CASE WHEN END para que la base de dato se encargue de retornarnos el string del pieHabil o posicion del futbolista
    
    const consulta = `SELECT idFutbolista, dni, nombre, apellido, apodo, foto,
        (CASE
            WHEN pieHabil = 0 THEN 'Derecho'
            WHEN pieHabil = 1 THEN 'Izquierdo'
        END) as pieHabil, 
        (CASE
            WHEN posicion = 0 THEN 'Arquero'
            WHEN posicion = 1 THEN 'Defensor'
            WHEN posicion = 2 THEN 'Mediocampista'
            WHEN posicion = 3 THEN 'Delantero'
        END) as posicion, false as seleccionado
        FROM futbolista WHERE activo = 1`;

    const [futbolistas] = await conexion.query(consulta);

    return futbolistas;
}

const eliminar = async (idFutbolista) => {
    const consulta = 'UPDATE futbolista SET activo = 0 WHERE idFutbolista = ?';
    await conexion.query(consulta, [idFutbolista]);
}

const crear = async (futbolista) => {
    const consulta = 'INSERT INTO futbolista SET ?';
    const [futbolistaNuevo] = await conexion.query(consulta, futbolista);

    return buscarPorId(futbolistaNuevo.insertId);
}


const buscarPorId2 = async (idFutbolista) => {
    const consulta = 'SELECT * FROM futbolista WHERE idFutbolista = ? AND activo = 1';

    try {
        const [resultados] = await conexion.query(consulta, [idFutbolista]);
        return resultados;
    } catch (error) {
        console.error('Error al buscar futbolista por ID:', error);
        throw error;
    }
};


const editarActualizar = async (idFutbolista, futbolistaActualizado) => {
    const { dni, nombre, apellido, posicion, apodo, pieHabil, foto } = futbolistaActualizado;

    const consulta = `
        UPDATE futbolista
        SET
          dni = ?,
          nombre = ?,
          apellido = ?,
          posicion = ?,
          apodo = ?,
          pieHabil = ?,
          foto = ?
        WHERE
          idFutbolista = ?
    `;

    try {
        await conexion.query(consulta, [dni, nombre, apellido, posicion, apodo, pieHabil, foto, idFutbolista]);

        // Después de la actualización, obtenemos los detalles actualizados del futbolista
        const futbolistaEditado = await buscarPorId2(idFutbolista);
        console.log('Futbolista actualizado correctamente');
        console.log('Resultado de buscarPorId:', futbolistaEditado);

        return futbolistaEditado;
    } catch (error) {
        console.log('Error al actualizar el futbolista:', error);
        throw error;
    }
};




module.exports = {
    buscarTodos,
    buscarPorId,
    crear,
    eliminar,
    editarActualizar,
}

