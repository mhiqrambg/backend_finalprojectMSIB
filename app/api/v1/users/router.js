const express = require('express');
const router = express.Router();
const { signIn, signupUser, updateProfile } = require('./controller');

router.post('/signup', signupUser);
router.post('/signin', signIn);
router.put('/signin', signIn);
router.put('/profile/:username', updateProfile);

module.exports = router;
