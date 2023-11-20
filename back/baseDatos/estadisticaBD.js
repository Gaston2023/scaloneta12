
const conexion = require('./conexionBDScaloneta');

const estadistica = async () => {
    
    const consulta = 'call procEstadistica1()';
    const [results] = await conexion.query(consulta);

    console.log(results);
    
    const futbolistas = results[0][0].futbolistas;

    const datos = {
        futbolistasActivos : futbolistas,
        
    }
    return datos;
}


// Esta función llama al procedimiento almacenado procEstadistica2, que recibe el número de la convocatoria como parámetro y devuelve los datos de los futbolistas convocados
const estadistica2 = async (convocatoria) => {

    const consulta = 'call procEstadistica2(?)';  
    
    const [results] = await conexion.query(consulta, [convocatoria]);    
    
    const datos = results[0];

    return datos;
    
};

const estadistica3 = async () => {
   
    const consulta = 'call procEstadistica3()';
    const [results] = await conexion.query(consulta);

    console.log(results);
    const convocatorias = results[0][0].convocatorias;

    const datos = {
        
        convocatoriasActivas : convocatorias
    }
    return datos;

}


module.exports = {
    estadistica,
    estadistica2,
    estadistica3,
}

