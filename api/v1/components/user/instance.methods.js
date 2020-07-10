const jwt = require('jsonwebtoken');
const crypto = require('crypto');


// HELPER FUNCTIONS

/**
 * Create an expiry date for the refresh token
 * Returns the generated date
 */

let generateRefreshTokenExpiry = () => {
    let daysUntilExpire = '10';
    let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondsUntilExpire);
}


// INSTANCE METHODS

module.exports = (UserSchema) => {

    /**
     * Convert the response to a JSON object
     * Delete the password and sessions properties from the response
     * Return the user object except the password and session properties
     */
    UserSchema.methods.toJSON = function () {
        const user = this;
        const userObject = user.toObject();

        ['password', 'sessions'].forEach(e => delete userObject[e]);
        return userObject;
    }

    /**
     * Create a new access token using the JWT library containing the user ID
     * Returns a promise containing the generated access token
     */

    UserSchema.methods.generateAccessToken = function () {
        const user = this;
        const jwtKey = process.env.JWT_KEY

        return new Promise((resolve, reject) => {
            // generate the token
            jwt.sign({ _id: user._id.toHexString() }, jwtKey, { expiresIn: '5m' }, (err, token) => {
                if (!err) {
                    return resolve(token);
                } else {
                    reject(err);
                };
            })
        });
    };

    /**
     * Create a new refresh token which will be a random string using the crypto library
     * Returns a promise containing the generated refresh token
     */

    UserSchema.methods.generateRefreshToken = function () {

        return new Promise((resolve, reject) => {
            crypto.randomBytes(64, (err, buffer) => {
                if (!err) {
                    let token = buffer.toString('hex');
                    return resolve(token);
                }
            })
        });
    };

    /**
     * Saves a new session (refresh token with expiry date) to the sessions array in the user's object
     * Returns the refresh token
     */

    UserSchema.methods.createSession = function () {
        let user = this;

        return user.generateRefreshToken().then((refreshToken) => {
            let expiresAt = generateRefreshTokenExpiry();

            user.sessions.push({ token: refreshToken, expiresAt });

            return new Promise((resolve, reject) => {
                user.save().then(() => {
                    return resolve(refreshToken)
                }).catch((e) => {
                    return reject(e);
                });
            })

        })
    };



};