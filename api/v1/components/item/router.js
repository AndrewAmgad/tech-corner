const express = require('express');
const router = express.Router();

const verifyAccessToken = require('../../middleware/checkAuth').verifyAccessToken;
const getUserInfo = require('../../middleware/checkAuth').getUserInfo;

const createItem = require('./controllers/post').createItem;
const uploadItemImages = require('./controllers/post').uploadItemImages;
const addToFavorites = require('./controllers/get').addToFavorites;
const getItems = require('./controllers/get');
const search = require('./controllers/get').search;
const getFavorites = require('./controllers/get').getFavorites;
const deleteItem = require('./controllers/delete').deleteItem;
const deleteFavorite = require('./controllers/delete').deleteFavorite;
const patchItem = require('./controllers/patch');

// POST Requests
router.post('/', verifyAccessToken, createItem);
router.post('/:item_id/upload-images', verifyAccessToken, uploadItemImages)

// GET Requests
router.get('/', getUserInfo, getItems.getAll);
router.get('/favorites', verifyAccessToken, getFavorites);
router.get('/search', search);
router.get('/:item_id', getUserInfo, getItems.getOne);
router.get('/:item_id/favorite', verifyAccessToken, addToFavorites);

// DELETE Requests
router.delete('/:item_id', verifyAccessToken, deleteItem);
router.delete('/:item_id/favorite', verifyAccessToken, deleteFavorite);

// PATCH Requests
router.patch('/:item_id', verifyAccessToken, patchItem);
    
module.exports = router;