const express = require('express');
const router = express();
const { getAllProducts } = require('./controller');

router.get('/products', getAllProducts);

module.exports = router;
