const handleRetrieveUsers = require('../controllers/retriveUsersController');
const handleRefreshToken = require('../controllers/refrechTokenController');
const handleLoginAuth = require('../controllers/loginController');
const handleRegister = require('../controllers/registerController');
const handleLogout = require('../controllers/logoutControler');
const verifyCode = require('../controllers/verifyVerificationCode');
const resendCode = require('../controllers/resendVerificationMail');
const router = require('express').Router();

require('dotenv').config();


//retrieve users
router.get('/',handleRetrieveUsers.retrieveUsers);
// Register a new user
router.post('/register', handleRegister.register);
// Login
router.post('/login', handleLoginAuth.loginAuth);
// get refrechToken
router.get('/login',handleRefreshToken.handleRefreshToken);
//resend verification code
router.post('/re-send-code',resendCode.resendCode);
//verify verification code
router.post('/verify-code',verifyCode.verifyCode);
// Logout
router.get('/logout', handleLogout.logout);


module.exports = router;