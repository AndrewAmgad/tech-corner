const Item = require('../model');
const errorResponse = require('../../../helper-functions').errorResponse;
const User = require('../../user/model');
const uploadImages = require('../../../setup/aws-setup').uploadImages;
const mongoose = require('mongoose');

/**
 * POST /items
 * Purpose: Create a new item 
 */
module.exports.createItem = async function createItem(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const details = req.body.details;
    const category = req.body.category;
    const price = req.body.price;

    let errors = {};
    let error = false;

    // Input validation
    if(title.length < 15) {error = true, errors.title = "Title is too short"};
    if(details.length < 50) {error = true, errors.details = "Content is too short"};
    if(!category) {error = true, errors.category = "Category is required"};
    if(!price) {error = true, errors.price = "Price is missing"};

    if(error) return errorResponse(res, 400, errors);

    const user = await User.findById(userId).catch(err => (errorResponse(res, 500, err.message)));

    // save product to the database
    const item = new Item({
        images: [],
        seller: userId,
        title: title,
        details: details,
        category: category,
        price: price,
        time: new Date().getTime(),
        views: 0,
    });

    // Save the item to the database
    item.save().then(item => {
        var response = item.toObject();
        response.seller = {
            id: user._id,
            name: user.firstName + " " + user.lastName,
            phone: user.phone
        }
        res.status(200).json(response);
    });
};

/**
 * POST /items/:item_id/upload-images
 * Purpose: Upload item images and add their URLS to the item's database object
 * Endpoint uses form-data to receive the image files
 */
module.exports.uploadItemImages = async function uploadItemImages(req, res) {
    const userId = req.userId;
    const itemId = req.params.item_id;

    
    const item = await Item.findById(itemId);

    if (!item) return errorResponse(res, 404, 'Item ID not found');
    if (userId !== item.seller.toString()) return errorResponse(res, 400, 'You do not have access to this post');
    if(item.images.length > 4) return errorResponse(res, 400, `An item cannot contain more than 4 images`)

    // Upload the received images
    uploadImages(req, res, error => {
        if (error) return errorResponse(res, 500, error);
        if (req.files === undefined) return errorResponse(res, 400, 'No files received');

        let filesArray = req.files

        var imageKeys = [];

        filesArray.map((file) => {
            imageKey = file.key;

            if(item.images.length + imageKeys.length < 4) imageKeys.push(imageKey);
        });

        item.images.push(...imageKeys);
        item.save();

        res.status(200).json({
            images: item.images
        });
    })
}