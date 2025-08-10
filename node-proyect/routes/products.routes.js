const express = require('express');
const router = express.Router();
const { 
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products.controller'); // importamos los controladores

const verifyToken = require('../middlewares/verifyToken')
const isAdmin = require('../middlewares/isAdmin')


//definir las rutas de la aplicación:
router.get('/', verifyToken, getAllProducts);
router.get('/:id', getProductById);
router.post('/',verifyToken, isAdmin, createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router