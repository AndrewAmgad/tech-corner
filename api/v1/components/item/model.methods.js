// ITEM MODEL METHODS

module.exports = (ItemSchema) => {

    /**
     * Paginates the collection and grabs items depending on the provided page number and page limit
     * Arguments are as following: query, pageNumber, pageLimit
     * Returns the query response as a promise
     */

    ItemSchema.statics.findAndPaginate = function (query, pageNumber, limit) {
        const Item = this;
        
        // Check if the provided numbers are not equal to null or undefined before storing them into constants
        const page = Number.isNaN(parseInt(pageNumber, 10)) ? 0 : parseInt(pageNumber, 10);
        const pageLimit = Number.isNaN(parseInt(limit, 10)) ? 10 : parseInt(limit, 10);

        // Check if the page number and limit are valid numbers
        if (typeof page !== 'number' || typeof pageLimit !== 'number') return errorResponse(res, 400, "page and page_limit must be numbers");

        return new Promise((resolve, reject) => {
            Item.find(query)
                .skip(page && pageLimit ? (page - 1) * pageLimit : 0)
                .limit(page !== 0 ? pageLimit : null)
                .sort({"_id": -1})
                .populate("seller")
                .populate("category")
                .lean().then(async items => {

                    // Get the total amount of documents in the items collection
                    const count = await Item.countDocuments(query);

                    // Check if there are more posts in the next page
                    const hasMore = (pageLimit * page) < count && (page !== 0) ? true : false;
             
                    items.map(item => {
                        const seller = {
                            id: item.seller._id,
                            name: item.seller.firstName + " " + item.seller.lastName,
                            phone: item.seller.phone
                        };
                        item.seller = seller;
                    });

                    const response = {
                        page: page,
                        total: count,
                        has_more: hasMore,
                        items
                    }

                    resolve(response);

                }).catch(err => {
                    console.log(err)
                    reject(err.message);
                });
        })
    }
}