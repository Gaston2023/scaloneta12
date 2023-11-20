const Router = require('express');
const {nueva, nueva2, FutbolistaConvocatoriaPorIdConvocatoria} = require('../../controladores/futbolistaConvocatoria');
const router = Router();


router
    .post('/nueva', nueva)
    .put('/nueva2',nueva2)    
    .get('/futbolistaConvocatoria/:idConvocatoria', FutbolistaConvocatoriaPorIdConvocatoria)
    .post('/futbolistaConvocatoria/:idConvocatoria', FutbolistaConvocatoriaPorIdConvocatoria)

module.exports = router;
