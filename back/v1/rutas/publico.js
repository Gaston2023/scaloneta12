const { Router } = require('express');
const { check } = require('express-validator');
const { enviarCorreo } = require('../../controladores/publico');
const { validarCampos } = require('../../middlewares/validarCampos');

const router = Router();

// array de middlewares, tiene que pasar el middleware para llegar al controlador enviarCorreo
router.post('/contacto', [
    check('correo','El correo es obligatorio').isEmail(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('mensaje','El mensaje es obligatorio').not().isEmpty(),
    validarCampos
], enviarCorreo);

module.exports = router; 
