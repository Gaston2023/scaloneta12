const futbolistasConvocatoriaBD = require('../baseDatos/futbolistaConvocatoriaBD');

const nueva = async (req, res) => {
    const { idConvocatoria, futbolistas, dorsales } = req.body;

    try {
        await futbolistasConvocatoriaBD.nueva(idConvocatoria, futbolistas, dorsales);

        res.status(201).json({ estado: 'OK', msj: 'Convocatoria Realizada!' });
    } catch (error) {
        console.log('Error en nuevaConvocatoria:', error);
        res.status(500).json({ estado: 'ERROR', msj: 'Error al procesar la convocatoria' });
    }
};

FutbolistaConvocatoriaPorIdConvocatoria = async (req, res) => {
    const {idConvocatoria} = req.params;

    try{
        const convocados = await futbolistasConvocatoriaBD.FutbolistaConvocatoriaPorIdConvocatoria(idConvocatoria);
        res.status(201).json({estado:'OK', dato:convocados});
        console.log('Estos son los convocados: ', convocados)
    }catch (exec){
        throw exec;
    }
}

const { guardarCambiosConvocatoria } = require('../baseDatos/futbolistaConvocatoriaBD');

const nueva2 = async (req, res) => {
    try {
        const { idConvocatoria, titulares, capitan } = req.body;
        await guardarCambiosConvocatoria(idConvocatoria, titulares, capitan);
        res.json({ estado: 'OK', mensaje: 'Cambios guardados exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: 'ERROR', mensaje: 'Error al guardar los cambios.' });
    }
};


module.exports = {
    nueva,
    nueva2,
    FutbolistaConvocatoriaPorIdConvocatoria,
}

