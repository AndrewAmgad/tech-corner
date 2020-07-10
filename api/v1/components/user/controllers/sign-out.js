const User = require('../model');
const errorResponse = require('../../../helper-functions').errorResponse;

module.exports = signOut = async (req, res, next) => {
    const userId = req.userId;

    let refreshToken = req.header('x-refresh-token') ? req.header('x-refresh-token') : req.cookies.refreshToken;
    if(!refreshToken) return errorResponse(res, 401, "Refresh token must be provided");

    User.findByIdAndUpdate(userId, { $pull: { sessions: { token: refreshToken } } },
         { new: true, passRawResult: true })
        .then(() => {
            // Send empty cookies to replace the old ones
            res.cookie('accessToken', "", { httpOnly: true, maxAge: 0 });
            res.cookie('refreshToken', "", { httpOnly: true, maxAge: 0 });
            res.cookie('_id', "", {httpOnly: true, maxAge: 0})

            res.status(200).json({
                message: "Signed out successfully"
            });
        }).catch(err => (errorResponse(res, 500, err)));


};