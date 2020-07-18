const Category = require('../model');
const errorResponse = require('../../../helper-functions').errorResponse;

/**
 * GET /categories
 * Purpose: Get a list of all categories
 * Returns a list of category names & ID's
 */

 module.exports.getAllCategories = (req, res) => {
     Category.find({}).then(response => {
         res.status(200).json(response);
     }).catch(err => {
         console.log(err);
         return errorResponse(res, 500, err.message)
     })
 };

 // Temporary endpoint for testing
 module.exports.post = (req, res) => {
     const name = req.body.name;

     const category = new Category({
         name: name
     });

     category.save().then(() => {
         res.status(200).json({message: "saved"})
     });
 }