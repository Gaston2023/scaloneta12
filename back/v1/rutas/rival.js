const {Router} = require('express');

const { buscarPorId, buscarTodos } = require('../../controladores/rival');

const router = Router();

router
    .get('/rivales', buscarTodos)
    .get('/rivales/:idRival', buscarPorId);


module.exports = router;
