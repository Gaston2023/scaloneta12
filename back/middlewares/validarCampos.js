const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) =>{

    const errors = validationResult(req);

    // existen errores?
    if (!errors.isEmpty()){
        return res.status(400).json({estado:'FALLA', msj:errors.mapped()})
    }

    // no hay errores sigue con la ejecucion del controlador de la ruta
    next();
}

module.exports ={
    validarCampos,
}