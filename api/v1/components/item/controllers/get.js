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
    const userId = req.userId;
    const pageNumber = req.query.page;
    const pageLimit = req.query.page_limit;
    const category = req.query.category;

    // Filter response with category ID if one is provided
    let query = {}
    if (category) query = { category: category }

    Item.findAndPaginate(query, pageNumber, pageLimit).then(response => {
        let date = new Date().getTime();

        response.items.map((item, index) => {
            // Remove items which have been submitted but their images are still uploading
            if (date - item.time < 120000 && item.images.length < 1) {
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
    const userId = req.userId;
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

            // Add an 'editable' boolean which is true if the post is editable by the requesting user
            if (userId && userId.toString() === itemObject.seller._id.toString()) itemObject.editable = true;
            else itemObject.editable = false;

            // Add seller data to the response
            const seller = {
                id: itemObject.seller._id,
                name: itemObject.seller.firstName + " " + itemObject.seller.lastName,
                number: itemObject.seller.number,
                location: itemObject.seller.city
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
    if (!user) return errorResponse(res, 404, "User not found")

    // Validate provided object ID
    if (mongoose.Types.ObjectId.isValid(itemId)) {
        if (user.favorites.includes(itemId)) return errorResponse(res, 400, "Item has already been added to favorites");

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
    const userId = req.userId;
    const result = await User.findById(userId)
        .lean()
        .select('favorites')
        .populate({
            path: 'favorites',
            populate: {
                path: 'category',
                model: 'category'
            },
            populate: {
                path: 'seller',
                model: 'User',
                select: '_id email firstName lastName city phone'
            }
        });

    let favorites = result.favorites;

    favorites.map((item) => {
        // Add an 'editable' boolean which is true if the post is editable by the requesting user
        if (userId && userId.toString() === item.seller._id.toString()) item.editable = true;
        else item.editable = false;
    })
    res.status(200).json(favorites);

};

/** 
 * GET /items/search?query
 * Purpose: Return all items that match the provided search query
 */

 module.exports.search = async function searchItems(req, res) {
    const searchQuery = req.query.query;
     Item.findAndPaginate({$text: {$search: searchQuery}}).then(response => {
         res.status(200).json(response);
     }).catch(err => {
         errorResponse(res, 500, err);
     });
};