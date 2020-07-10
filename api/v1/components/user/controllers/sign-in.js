const User = require('../model');
const errorResponse = require('../../../helper-functions').errorResponse;

/**
 * POST /users/login
 * Purpose: Sign a user in
 */
module.exports = signIn = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then(user => {
        return user.createSession().then(refreshToken => {
            // New session has been created successfully, refreshToken returned

            return user.generateAccessToken().then((accessToken) => {
                // access auth token generated successfully, return an object containing both auth tokens
                return { accessToken, refreshToken }
            }).then((authTokens) => {

                // Set the response cookies
                res.cookie('accessToken', authTokens.accessToken, { httpOnly: true, maxAge: 300000 });
                res.cookie('refreshToken', authTokens.refreshToken, { httpOnly: true, maxAge: 604800000 });
                res.cookie('_id', user._id, {httpOnly: true, maxAge: 604800000})

                // Set response header, status code and send the user object as a json response
                res
                    .header('x-refresh-token', authTokens.refreshToken)
                    .header('x-access-token', authTokens.accessToken)
                    .header('_id', user._id)
                    .status(200)
                    .json(user);
            });
        })
    }).catch((e) => (errorResponse(res, 400, e)))
}

    module.exports = signIn;