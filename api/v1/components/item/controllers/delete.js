const Item = require('../model');
const User = require('../../user/model');

const errorResponse = require('../../../helper-functions').errorResponse;
const aws = require('../../../setup/aws-setup').setup;

/**
 * DELETE /items/:item_id
 * Purpose: Delete an item using its ID
 */
module.exports.deleteItem = async (req, res) => {
    const userId = req.userId;
    const itemId = req.params.item_id;

    const item = await Item.findById(itemId).catch(err => (errorResponse(res, 500, err.message)));

    if (!item) return errorResponse(res, 404, "Item not found");

    // return an error if request is attempted by someone who's not the seller
    if (item.seller.toString() !== userId.toString()) return errorResponse(res, 401, "Unauthorized delete");

    // Delete the item's images from the AWS S3 Bucket
    if (item.images.length > 0) {
        const imageObjects = []
        item.images.map(image => imageObjects.push({ Key: image }));

        aws.deleteObjects({
            Bucket: process.env.S3_BUCKET_NAME,
            Delete: { Objects: imageObjects },
        }, (err, data) => {
            if (err) return errorResponse(res, 500, err);
        })
    }

    Item.findByIdAndRemove(itemId).then(() => {
        res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });
    }).catch(err => errorResponse(res, 500, err.message));
};

/** 
 * DELETE /items/:item_id/favorite
 * Purpose: Remove an item from the user's favorites array
 */

module.exports.deleteFavorite = async (req, res) => {
    const userId = req.userId;
    const itemId = req.params.item_id;
    const user = await User.findById(userId);

    if (user.favorites.includes(itemId)) {
        const index = user.favorites.indexOf('5f1307a59290651fccc89c30');
        user.favorites.splice(index, 1);

        user.save().then(() => {
            res.status(200).json({ success: true, message: "Item removed from favorites successfully" })
        });
        
    } else {
        return errorResponse(res, 400, "This item is not in your favorites");
    };

}