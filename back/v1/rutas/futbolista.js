
const {Router} = require('express');
const router = Router();
const { buscarPorId, buscarTodos, eliminar, crear, editarActualizar } = require('../../controladores/futbolista');
const {upload}=require('../../controladores/subirArchivo')

// Agregar un futbolista
router.post('/futbolistas', upload,crear);

// Eliminar un futbolista por ID
router.delete('/futbolistas/:idFutbolista', eliminar);

// Editar/Actualizar un futbolista por ID
router.put('/futbolistas/:idFutbolista', upload, editarActualizar);

// Buscar todos los futbolistas
router.get('/futbolistas', buscarTodos);

// Buscar un futbolista por su ID
router.get('/futbolistas/:idFutbolista', buscarPorId);

module.exports = router;
