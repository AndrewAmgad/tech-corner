const User = require('../model');
const errorResponse = require('../../../helper-functions').errorResponse;

/**
 * GET /users/access-token
 * Purpose: Generate a new access token for the user and return it to the client 
 */

 module.exports = (req, res) => {
    req.userObject.generateAccessToken().then((accessToken) => {
        res.cookie('accessToken', accessToken, {httpOnly: true, maxAge: 300000});
        res.header('x-access-token', accessToken).json({ accessToken });
    }).catch((e) => {
        res.status(400).json({
            error: e
        });
    })
 };