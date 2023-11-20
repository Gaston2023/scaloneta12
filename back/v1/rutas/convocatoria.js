const Router = require('express');

const {buscarPorId, buscarTodas, nueva, modificar, eliminar} = require('../../controladores/convocatoria');

const router = Router();


router
    .post('/nueva', nueva)
    .put('/convocatorias/:idConvocatoria', modificar)
    .delete('/convocatorias/:idConvocatoria', eliminar)
    .get('/convocatorias', buscarTodas)
    .get('/convocatorias/:idConvocatoria', buscarPorId);

module.exports = router;


