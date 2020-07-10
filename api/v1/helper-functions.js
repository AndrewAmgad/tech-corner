const jwt = require('jsonwebtoken');

// json response when there is an error of any kind
module.exports.errorResponse = function errorResponse(res, code, message) {
    return res.status(code).json({
        error: true,
        reason: message
    });
}


