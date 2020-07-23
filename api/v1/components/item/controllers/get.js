const Item = require('../model');
const User = require('../../user/model');
const errorResponse = require('../../../helper-functions').errorResponse;
const mongoose = require('mongoose');

/**
 * GET /items
 * Purpose: Get all items
 * Returns all items if no page number or limit is entered through a query parameter
 */
module.exports.getAll = (req, res) => {
    const pageNumber = req.query.page;
    const pageLimit = req.query.page_limit;
    const category = req.query.category;

    // Filter response with category ID if one is provided
    let query = {}
    if(category) query = {category: category}
    
    Item.findAndPaginate(query, pageNumber, pageLimit).then(response => {

        // Remove items that do not contain images from the response
        let date = new Date().getTime();

        // Remove items which have been submitted but their images are still uploading
        response.items.map((item, index) => {
            if(date - item.time < 120000  && item.images.length < 1){
                response.items.splice(index, 1);
            } 
        })

        res.status(200).json(response);
    }).catch(err => {
        console.log(err)
        return errorResponse(res, 500, err);
    });
};

/**
 * GET /items/:item_id
 * Purpose: Find an item using its ID
 */
module.exports.getOne = (req, res) => {
    const id = req.params.item_id;

    if (!id) return errorResponse(res, 400, "Item ID must be provided");

    Item.findById(id)
        .populate('seller')
        .then(item => {
            if (!item) return errorResponse(res, 404, "Item not found");

            // Increase item's views by one
            item.views = item.views + 1;
            item.save();

            var itemObject = item.toObject();

            // Add seller data to the response
            const seller = {
                id: itemObject.seller._id,
                name: itemObject.seller.firstName + " " + itemObject.seller.lastName,
                number: itemObject.seller.number
            };

            itemObject.seller = seller;

            res.status(200).json(itemObject);

        })
}

/**
 * GET /items/:item_id/favorite
 * Purpose: Add an item to the sending user's favorites array
 * Returns a success message if added successfully
 */

module.exports.addToFavorites = async function addToFavorites(req, res) {
    const userId = req.userId;
    const itemId = req.params.item_id;
    const user = await User.findById(userId);

    // Validate provided object ID
    if(mongoose.Types.ObjectId.isValid(itemId)) {
       if(user.favorites.includes(itemId)) return errorResponse(res, 400, "Item has already been added to favorites");
       
       user.favorites.push(itemId);
       user.save();
       res.status(200).json({
           success: true,
           message: "Added item to favorites successfully"
       });
    } else {
        return errorResponse(res, 404, "Provided item ID is invalid");
    };
};

/** GET /items/favorites
 * Purpose: Get all favorited items for the user
 * Returns favorited items in an array
 */

 module.exports.getFavorites = async function getFavorites(req, res) {
  
 };