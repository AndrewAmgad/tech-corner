const bcrypt = require('bcryptjs');

// USER MODEL METHODS

module.exports = (UserSchema) => {

    /**
     * Locates a user object using its ID and provided refresh token
     * Used to validate the provided refresh token in authentication middleware
     * Returns the user object
     */

    UserSchema.statics.findByIdAndToken = function (_id, token) {
        const User = this;

        return User.findOne({
            _id,
            'sessions.token': token
        });
    };

    /**
     * Locates a user object using its email and password (credentials)
     * Used to sign-in user, ensuring provided credentials are valid
     * Returns a promise containing the user object
     */

    UserSchema.statics.findByCredentials = function (email, password) {
        let User = this;

        return User.findOne({ email }).then(user => {
            if (!user) return Promise.reject("Entered email does not exist");

            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) resolve(user);
                    else {
                        reject('Password is incorrect');
                    };
                });
            });
        });
    };

    /**
     * Checks if the provided refresh token expiry date is over
     * Returns a boolean
     */

    UserSchema.statics.hasRefreshTokenExpired = function (expiryDate) {
        let secondsSinceEpoch = Date.now() / 1000;

        if (expiryDate < secondsSinceEpoch) {
            return true;
        } else {
            return false;
        };
    };

};