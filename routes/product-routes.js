const express = require('express');
const { getAllProduts, getProductById, createProduct, updateProduct, deleteProduct} = require('../controllers/product-controllers');
const { verifyTokenHandler, verifyRole } = require('../middlewares/jwt-handler')

const router = express.Router();

router.route('/').get(getAllProduts).post([verifyTokenHandler, verifyRole(['Admin'])], createProduct);
router.route('/:id').get(getProductById).put([verifyTokenHandler, verifyRole(['Admin'])], updateProduct).delete([verifyTokenHandler, verifyRole(['Admin'])], deleteProduct);

module.exports = router;