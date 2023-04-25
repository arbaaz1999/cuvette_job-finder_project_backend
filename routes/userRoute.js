const express = require('express');
const { registerUser, loginAuth } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginAuth)

module.exports = router;