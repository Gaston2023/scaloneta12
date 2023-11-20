
const futbolistaBD = require('../baseDatos/futbolistaBD');

// Función para crear un jugador con los datos del cuerpo de la petición
const crear = async (req, res) => {

    // Obtener los datos del cuerpo de la petición
    const { dni, nombre, apellido, posicion, apodo, pieHabil } = req.body;

    // obtengo el nombre del archivo que manda el cliente
    let filename;
    if (!req.file) {
        filename = 'default.jpg';
    } else {
        filename = req.file.filename;
    }


    if (!dni || !nombre || !apellido || !posicion || !pieHabil || !apodo) {
        res.status(404).json({ estado: 'FALLA', msj: 'Faltan datos obligatorios' });
    } else {
        const futbolista = {
            dni: dni,
            nombre: nombre,
            apellido: apellido,
            posicion: posicion,
            pieHabil: pieHabil,
            apodo: apodo,
            activo: 1, // activo por defecto al crearse
            foto: filename // guardo en la base de datos el nombre del archivo
        };

        try {
            const futbolistaNuevo = await futbolistaBD.crear(futbolista);
            res.status(201).json({ estado: 'OK', msj: 'Futbolista creado', dato: futbolistaNuevo });
        } catch (exec) {
            throw exec;
        }
    }


}

// Función para leer todos los jugadores
const buscarTodos = async (req, res) => {

    try {
        const futbolistas = await futbolistaBD.buscarTodos();
        res.json({ estado: 'OK', dato: futbolistas });

    } catch (exec) {
        throw exec;
    }

}

// Función para leer un jugador por su id
const buscarPorId = async (req, res) => {
    try {
        // Obtener el id del jugador de los parámetros de la ruta
        const idFutbolista = req.params.idFutbolista;
        // Validar que el id esté presente
        if (!idFutbolista) {
            res.status(400).json({ estado: 'FALLO 400', mensaje: 'Falta el id del jugador' });
        } else {
            // Llamar a la función leerPorId del CRUD y obtener el resultado
            const resultado = await futbolistaBD.buscarPorId(idFutbolista);
            // Enviar una respuesta exitosa con el resultado
            res.status(200).json({ estado: 'OK', dato: resultado });
        }
    } catch (error) {
        // Enviar una respuesta de error con el error capturado
        res.status(500).json({ estado: 'FALLO 500 x ID', mensaje: error.message });
    }
}


const editarActualizar = async (req, res) => {
    const { idFutbolista } = req.params;
    const { dni, nombre, apellido, posicion, apodo, pieHabil } = req.body;

    // obtengo el nombre del archivo que manda el cliente
    let filename;
    if (!req.file) {
        filename = 'default.jpg';
    } else {
        filename = req.file.filename;
    }

    
    if (!idFutbolista) {
        res.status(404).json({ estado: 'FALLA', msj: 'Faltan datos obligatorios' });
    } else {
        const { dni, nombre, apellido, posicion, apodo, pieHabil } = req.body;
        const futbolistaActualizado = {
            dni: dni,
            nombre: nombre,
            apellido: apellido,
            posicion: posicion,
            apodo: apodo,
            foto: filename,
            pieHabil: pieHabil
        };
        console.log('futbolista actualizado', futbolistaActualizado)

        try {
            const futbolistaEditado = await futbolistaBD.editarActualizar(idFutbolista, futbolistaActualizado);
            res.status(200).json({ estado: 'OK', msj: 'Futbolista actualizado', dato: futbolistaEditado });
            
        } catch (error) {
            console.error('Error al editar el futbolista en el controlador:', error);
            res.status(500).json({ estado: 'ERROR', msj: 'No se pudo actualizar el futbolista' });
        }
    }
};


// Función para eliminar un jugador (cambiar su estado a inactivo)
eliminar = async (req, res) => {
    const idFutbolista = req.params.idFutbolista;

    if (!idFutbolista) {
        res.status(404).json({ estado: 'FALLO', msj: 'no se especifico el id del Futbolista' });
    } else {
        try {
            await futbolistaBD.eliminar(idFutbolista);
            res.status(200).json({ estado: 'OK', msj: 'Futbolista eliminado con exito' });
        } catch (error) {
            throw exec;
        }
    }
}

// Exportar las funciones para usarlas en las rutas
module.exports = {
    crear,
    buscarTodos,
    buscarPorId,
    editarActualizar,
    eliminar
}
