const express = require('express');
const router = express.Router();

const verifyAccessToken = require('../../middleware/checkAuth').verifyAccessToken;

const createItem = require('./controllers/post').createItem;
const uploadItemImages = require('./controllers/post').uploadItemImages;
const addToFavorites = require('./controllers/get').addToFavorites;
const getItems = require('./controllers/get');
const deleteItem = require('./controllers/delete');
const patchItem = require('./controllers/patch');


router.post('/', verifyAccessToken, createItem);
router.post('/:item_id/upload-images', verifyAccessToken, uploadItemImages)


router.get('/', getItems.getAll);
router.get('/:item_id', getItems.getOne);
router.get('/:item_id/favorite', verifyAccessToken, addToFavorites);

router.delete('/:item_id', verifyAccessToken, deleteItem);

router.patch('/:item_id', verifyAccessToken, patchItem);
    
module.exports = router;