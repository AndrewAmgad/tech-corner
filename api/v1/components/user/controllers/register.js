const User = require('../model');
const errorResponse = require('../../../helper-functions').errorResponse;

/**
 * Check if the provided input matches a proper email format
 * Returns a boolean
 */
const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * Ensure that the password includes at least a single character and a digit
 * Returns a boolean
 */
const validatePassword = (password) => {
    var re = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    return re.test(password);
}

/**
 * Validate all inputs and make sure they match the specified criteria 
 * Returns the found errors, if no errors are found, returns true
 */
const validateInputs = async (email, firstName, lastName, password, phone) => {
    var error = false;
    var errors = {};
    var errorCode = 400;

    // Search the user collection using the entered email
    const user = await User.find({ email: email }).catch(err => (errors.server = err));

    // Error handling and input validation
    if (user && user.length >= 1) { error = true; errors.email = "An account with this email already exists", errorCode = 409 };
    if (!validateEmail(email)) { error = true; errors.email = "Email format is invalid" }
    if (!email || email.length > 200) { error = true; errors.email = "Email is too short or too long"; }
    if (firstName === undefined || firstName === "") { error = true; errors.firstName = "First Name has to be provided"; }
    if (lastName === undefined || lastName === "") { error = true; errors.lastName = "Last Name has to be provided"; }
    if(firstName.length > 10 || firstName.length < 4) {error= true, errors.firstName= "First name must contain 4 to 10 characters"}
    if(lastName.length > 10 || lastName.length < 4) {error= true, errors.lastName= "First name must contain 4 to 10 characters"}
    if (!password || password.length < 8 || password.length > 50) { error = true; errors.password = "Password is too short or too long"; }
    if (!validatePassword(password)) { error = true; errors.password = "Password must be a mixture of both characters and numbers" }
    if(!phone) { error = true, errors.phone = "Phone number must be provided"}

    // Send back an error if any of the above conditions return one
    return new Promise((resolve, reject) => {
        if (error) {
            const error = {
                messages: errors,
                code: errorCode
            }
            return reject(error);
        } else {
            resolve(true);
        };
    });
};

/**
 * POST /users/register
 * Purpose: Creates a new user
 */

module.exports = register = async (req, res, next) => {
    const email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    const password = req.body.password;
    const phone = req.body.phone;
    const country = req.body.country;

    const inputsValidation = await validateInputs(email, firstName, lastName, password, phone)
        .catch((err) => (errorResponse(res, err.code, err.messages)));

    // Stop code executing if validateInputs returns an error
    if (inputsValidation !== true) return;

    // Capitalize first and last names
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);


    let newUser = new User({ email, firstName, lastName, country, password, phone });

    newUser.save().then(() => {

        // Create a new session using a new refresh token, save it to the user's database object
        return newUser.createSession();

    }).then((refreshToken) => {

        // Create a new access token and return it alongside the refresh token
        return newUser.generateAccessToken().then(accessToken => {
            return { accessToken, refreshToken }
        });

    }).then((authTokens) => {

        // Set the response cookies
        res.cookie('accessToken', authTokens.accessToken, { httpOnly: true, maxAge: 300000 });
        res.cookie('refreshToken', authTokens.refreshToken, { httpOnly: true, maxAge: 604800000 });
        res.cookie('_id', newUser._id, {httpOnly: true, maxAge: 604800000})

        // Set the response headers and send back the user object as a JSON response
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .header('_id', newUser._id)
            .status(200)
            .json(newUser);

    }).catch((e) => {
        res.status(400).json(e);
    });
};