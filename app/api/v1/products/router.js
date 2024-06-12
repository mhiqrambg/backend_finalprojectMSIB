const express = require('express');
const router = express();
const {
  getAllProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require('./controller');

router.get('/products', getAllProducts);
router.get('/products/:id', getOneProduct);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
