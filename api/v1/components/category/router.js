const express = require('express');
const router = express.Router();

const verifyAccessToken = require('../../middleware/checkAuth').verifyAccessToken;
const getAllCategories = require('./controllers/get').getAllCategories;
const post = require('./controllers/get').post

router.get('/', getAllCategories);
router.post('/', post);


module.exports = router;