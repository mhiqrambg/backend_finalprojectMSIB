const express = require('express');
const router = express();

const { index } = require('./controller');

router.get('/categories', index);

module.exports = router;
