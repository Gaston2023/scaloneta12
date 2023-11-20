const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

exports.enviarCorreo = async (req, res) =>{

    const {nombre, correo, mensaje} = req.body;
    const plantillaHds = fs.readFileSync(path.join(__dirname, '../utiles/handlebars/plantilla.hbs'), 'utf8');
    const correoTemplate = handlebars.compile(plantillaHds);
  
    const datos = {
      nombre: nombre,
      correo: correo,
      mensaje: mensaje
    };
  
    const correoHtml = correoTemplate(datos);

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.CORREO,
            pass:process.env.CLAVE
        }
    })
    
    // PONER CORREO DE PROFE CRISTIAN O DE IGNACIO (YA LO PROBÉ CON EL MIO Y FUNCIONA DE MARAVILLA)
    const opciones = {
        from : 'API PROG 3',
        to:'cristian.faure@uner.edu.ar',
        subject:'Asunto: Correo de Prueba con React - Prog3 - Gastón',
        html:correoHtml
    }

    transporter.sendMail(opciones, (error, info) => {
        if(error){
            const respuesta = 'Correo No enviado';
            res.json({respuesta});
            console.log('Correo no enviado Backend')
        }else{
            const respuesta = 'Correo enviado con exito';
            res.json({respuesta});
            console.log('Correo Enviado Backend')
        }
    })
}