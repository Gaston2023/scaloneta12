const conexion = require('./conexionBDScaloneta');

const borrarPorIdConvocatoria = async (cn, idConvocatoria) => {

    const consulta = 'DELETE FROM futbolistaConvocatoria WHERE convocatoria = ?';
    const [result] = await cn.query(consulta, idConvocatoria);

    return result;
}


const FutbolistaConvocatoriaPorIdConvocatoria = async (idConvocatoria) => {
    const consulta = `
      SELECT 
        f.idFutbolista, 
        f.nombre, 
        f.apellido, 
        fc.dorsal,
        (CASE
            WHEN f.posicion = '0' THEN 'Arquero'
            WHEN f.posicion = '1' THEN 'Defensor'
            WHEN f.posicion = '2' THEN 'Mediocampista'
            WHEN f.posicion = '3' THEN 'Delantero'
          END) as posicion, 
        fc.convocatoria,
        c.fecha as fechaConvocatoria,
        (CASE
          WHEN f.pieHabil = 0 THEN 'Derecha'
          WHEN f.pieHabil = 1 THEN 'Izquierda'
        END) as pieHabil,
        (CASE
          WHEN fc.esTitular = 0 THEN 'No'
          WHEN fc.esTitular = 1 THEN 'Si'
        END) as titular,
        (CASE
          WHEN fc.esCapitan = 0 THEN 'No'
          WHEN fc.esCapitan = 1 THEN 'Si'
        END) as capitan                        
      FROM futbolista AS f
      INNER JOIN futbolistaConvocatoria AS fc on fc.futbolista = f.idFutbolista
      INNER JOIN convocatoria AS c on c.idConvocatoria = fc.convocatoria
      WHERE f.activo = 1 AND fc.convocatoria = ?`;

    const [convocados] = await conexion.query(consulta, idConvocatoria);

    return convocados;
};


// Esta funcion asigna la fecha de la convocatoria mediante el idConvocatoria (No estaba seguro si era fecha actual o por idConvocatoria, se las dejo por las dudas)
// const nueva = async (idConvocatoria, futbolistas, dorsales) => {
//     const cn = await conexion.getConnection();

//     try {
//         await cn.beginTransaction();
//         // Obtener la fecha de la convocatoria
//         const [fechaConvocatoriaResult] = await cn.query('SELECT fecha FROM convocatoria WHERE idConvocatoria = ?', [idConvocatoria]);
//         const fechaConvocatoria = fechaConvocatoriaResult[0].fecha;
//         await borrarPorIdConvocatoria(cn, idConvocatoria);

//         futbolistas.forEach(async (futbolista) => {
//             const dato = {
//                 convocatoria: idConvocatoria,
//                 futbolista: futbolista,
//                 dorsal: dorsales[futbolista],
//                 fecha: fechaConvocatoria,
//             };

//             const consulta = 'INSERT INTO futbolistaConvocatoria SET ?';
//             await cn.query(consulta, dato);
//         });

//         await cn.commit();
//     } catch (error) {
//         await cn.rollback();
//         throw error;
//     } finally {
//         cn.release();
//     }
// };

// Esta funcion asigna la fecha actual en el momento en que se convocaron jugadores
const nueva = async (idConvocatoria, futbolistas, dorsales) => {
    const cn = await conexion.getConnection();

    try {
        await cn.beginTransaction();
        await borrarPorIdConvocatoria(cn, idConvocatoria);

        futbolistas.forEach(async (futbolista) => {
            const dato = {
                convocatoria: idConvocatoria,
                futbolista: futbolista,
                dorsal: dorsales[futbolista],
                fecha: new Date(),
            };

            const consulta = 'INSERT INTO futbolistaConvocatoria SET ?';
            await cn.query(consulta, dato);
        });

        await cn.commit();
    } catch (error) {
        await cn.rollback();
        throw error;
    } finally {
        cn.release();
    }
};


// capitan y titulares
const guardarCambiosConvocatoria = async (idConvocatoria, titulares, capitan) => {
    const cn = await conexion.getConnection();

    try {
        await cn.beginTransaction();

        // actualiza el estado de esTitular para todos los convocados a 0
        const updateQuery = 'UPDATE futbolistaConvocatoria SET esTitular = 0 WHERE convocatoria = ?';
        await cn.query(updateQuery, idConvocatoria);

        // actualiza el estado de esTitular para los futbolistas seleccionados a 1
        if (titulares.length > 0) {
            const updateTitularesQuery = 'UPDATE futbolistaConvocatoria SET esTitular = 1 WHERE futbolista IN (?) AND convocatoria = ?';
            await cn.query(updateTitularesQuery, [titulares, idConvocatoria]);
        }

        // actualiza el estado de esCapitan para el futbolista seleccionado a 1 y el resto a 0
        const updateCapitanQuery = 'UPDATE futbolistaConvocatoria SET esCapitan = CASE WHEN futbolista = ? THEN 1 ELSE 0 END WHERE convocatoria = ?';
        await cn.query(updateCapitanQuery, [capitan, idConvocatoria]);

        await cn.commit();
    } catch (error) {
        await cn.rollback();
        throw error;
    } finally {
        cn.release();
    }
};


module.exports = {
    nueva,
    borrarPorIdConvocatoria,
    FutbolistaConvocatoriaPorIdConvocatoria,
    guardarCambiosConvocatoria,
}





