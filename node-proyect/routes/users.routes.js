const express = require('express');
const router = express.Router();

const { 
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/user.controller.js'); // importamos los controladores

//definir las rutas de la aplicación:
router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);


module.exports = router