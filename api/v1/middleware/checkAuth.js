const jwt = require('jsonwebtoken');
const errorResponse = require('../helper-functions').errorResponse;

const User = require('../components/user/model');

// AUTHENTICATION MIDDLEWARES

/**
 * Verify the provided refresh token, whether it's received through cookies or headers
 * Used to determine whether to generate a new access token or not
 */

module.exports.verifyRefreshToken = (req, res, next) => {

    // Grab the refresh token from the request header or cookie
    let refreshToken = req.header('x-refresh-token') ? req.header('x-refresh-token') : req.cookies.refreshToken;
    if(!refreshToken) return errorResponse(res, 401, "Refresh token must be provided");

    // Get the user ID from the header or cookies
    let _id = req.header('_id') ? req.header('_id') : req.cookies._id;
    if (!_id) return errorResponse(res, 401, "User ID must be provided");

    // Authenticate the user using the provided ID and Refresh Token
    User.findByIdAndToken(_id, refreshToken).then(user => {
        if (!user) {
            // User could not be found, return an error
            return errorResponse(res, 401, "User not found or refresh token is invalid");
        }

        // Check if the refresh token is expired
        user.sessions.forEach(session => {
            if (session.token === refreshToken) {

                // Check expiry
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {

                    // Session is valid, refresh token is active
                    // Store user specific data to the user object
                    req.userId = user._id;
                    req.userObject = user;
                    req.refreshToken = refreshToken;

                    next();
                } else {
                    return errorResponse(res, 401, 'Refresh token has expired')
                }
            }
        })
    }).catch(err => {
        return errorResponse(res, 401, err)
    })
};


/**
 * Verify the provide JSON Web Token, continue to the next request if it is valid
 * Used in all endpoints that require authentication
 */
module.exports.verifyAccessToken = (req, res, next) => {
    var accessToken;
    const jwtSecret = process.env.JWT_KEY;

    // Grab the access token from the request header or cookie
    if (req.cookies.accessToken) {

        accessToken = req.cookies.accessToken;

    } else if (req.header('x-access-token')) {
        accessToken = req.header('x-access-token');

    } else {
        return errorResponse(res, 401, "Access token must be provided");
    };

    jwt.verify(accessToken, jwtSecret, (err, decoded) => {
        if(err) {
            // Provided JWT is invalid, return an error
            return errorResponse(res, 401, err);
        } else {
            // JWT is valid, move on to the next request
            req.userId = decoded._id;
            next();
        };
    })


};