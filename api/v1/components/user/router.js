const express = require('express');
const router = express.Router();

const verifyRefreshToken = require('../../middleware/checkAuth').verifyRefreshToken;
const verifyAccessToken = require('../../middleware/checkAuth').verifyAccessToken;

const register = require('./controllers/register');
const signIn = require('./controllers/sign-in');
const signOut = require('./controllers/sign-out');
const checkAuth = require('./controllers/check-auth');
const generateAccessToken = require('./controllers/access-token');

router.post('/register', register)
router.post('/signin', signIn);
router.get('/signout', verifyAccessToken, signOut)
router.get('/check-auth', verifyAccessToken, checkAuth);
router.get('/access-token', verifyRefreshToken, generateAccessToken)

module.exports = router;