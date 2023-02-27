const express = require('express');
const router = express.Router();
const {register,login,logout, isLoggedIn} = require('../controller/authController')

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/isLoggedIn',isLoggedIn)
module.exports = router