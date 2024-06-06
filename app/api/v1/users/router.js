const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById } = require('./controller');

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);

module.exports = router;
