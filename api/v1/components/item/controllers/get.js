const Item = require('../model');
const errorResponse = require('../../../helper-functions').errorResponse;

/**
 * GET /items
 * Purpose: Get all items
 * Returns all items if no page number or limit is entered through a query parameter
 */
module.exports.getAll = (req, res) => {
    const pageNumber = req.query.page;
    const pageLimit = req.query.page_limit

    Item.findAndPaginate({}, pageNumber, pageLimit).then(response => {

        // Remove items that do not contain images from the response
        response.items.map((item, index) => {
            if(item.images.length === 0) response.items.splice(index, 1);
        });

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