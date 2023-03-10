const express = require('express');
const app = express();
const router = express.Router();
//const cors = require('cors');

const {register,login,logout, isLoggedIn} = require('../controller/authController')

/* app.use(cors({
 origin:'*'
})) */

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/isLoggedIn',isLoggedIn)
module.exports = router