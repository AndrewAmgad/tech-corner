const errorResponse = require('../../../helper-functions').errorResponse;
const User = require('../../user/model');

/**
 * GET /users/checkauth
 * Purpose: Check if the provided access token is valid
 * Returns the user object for the provided access token
 */
module.exports = (req, res) => {
    const userId = req.userId;

    User.findById(userId).then(user => {
        if(!user) return errorResponse(res, 400, "Used not found");
        res.status(200).json(user);
    }).catch(err => (errorResponse(res, 500, err.message)));
}