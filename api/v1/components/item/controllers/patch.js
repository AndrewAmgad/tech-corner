const Item = require('../model');
const errorResponse = require('../../../helper-functions').errorResponse;

/**
 * PATCH /items/:item_id
 * Purpose: Modify the properties of an already existing item
 * Returns the modified item document
 */

module.exports = (req, res) => {
    const userId = req.userId;
    const itemId = req.params.item_id;

    // Input parameters
    const title = req.body.title;
    const details = req.body.details;
    const category = req.body.category;
    const price = req.body.price;

    // Object containing updated values
    let updatedValue = {};

    if (title) updatedValue.title = title;
    if (details) updatedValue.details = details;
    if (category) updatedValue.category = category;
    if (price) updatedValue.price = price;

    // Update the database document
    Item.findOneAndUpdate({ _id: itemId, seller: userId }, updatedValue, { new: true })
        .then(item => {
            if (!item) return errorResponse(res, 400, "Item not found");
            return res.status(200).json(item);
        });
}