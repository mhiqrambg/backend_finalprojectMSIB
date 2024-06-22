const express = require('express');
const router = express();

const { getAllCategories, createCategories } = require('./controller');

router.get('/categories', getAllCategories);
router.post('/categories', createCategories);

module.exports = router;
