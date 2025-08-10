const express = require('express');
const router = express.Router();
const { 
    register,
    login
} = require('../controllers/auth.controller.js'); // importamos los controladores

//definir las rutas de la aplicación:
router.post('/register', register);
router.post('/login', login);

module.exports = router