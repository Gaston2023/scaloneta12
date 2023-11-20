const express = require('express');
const cors = require('cors');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
require('dotenv').config();


const passport = require("passport");
require('./config/passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.use(cors());

app.get('/', (req, res)=>{
    const saludo = {estado:true, mensaje:'BIENVENIDOS A API DE FUTBOL!'}
    res.status(200).json(saludo);
});

// Ruta pública para acceder a los imagenes
app.get('/archivos/:nombreArchivo', (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    res.sendFile(path.join(__dirname, 'archivos', nombreArchivo));
});


const { esEntrenador } = require('./middlewares/esEntrenador');
const { esPresidente } = require('./middlewares/esPresidente');

const v1Publico = require('./v1/rutas/publico');
const v1Auth = require('./v1/rutas/auth');

const v1Rival = require('./v1/rutas/rival');
const v1Futbolista = require('./v1/rutas/futbolista');
const v1Convocatoria = require('./v1/rutas/convocatoria');
const v1FutbolistaConvocatoria = require('./v1/rutas/futbolistaConvocatoria');

const v1Estadistica = require('./v1/rutas/estadistica');

app.use('/api/v1/publico',  v1Publico);
app.use('/api/v1/auth', v1Auth);
app.use('/api/v1/rival', v1Rival);
app.use('/api/v1/futbolista', [passport.authenticate('jwt', {session: false}), esEntrenador], v1Futbolista);
app.use('/api/v1/convocatoria', v1Convocatoria);

app.use('/api/v1/futbolistaConvocatoria', v1FutbolistaConvocatoria);

app.use('/api/v1/estadistica', [passport.authenticate('jwt', {session: false}), esPresidente], v1Estadistica);


app.listen(process.env.PUERTO, ()=>{
    console.log('API de Futbol prog3 iniciada en puerto: ' + process.env.PUERTO);
})

