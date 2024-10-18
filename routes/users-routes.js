const express = require('express');
const { registerUser, login } = require('../controllers/users-controllers');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', login);

module.exports = router;
