const User = require("../models/user");
const Messages = require("../utilities/message");
const APIResponse = require("../utilities/apiresponse");
const TokenHandler = require("../utilities/tokengenerator");

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Ensure header key is lowercase

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return APIResponse.error(res, {
                status: 401,
                message: Messages.AUTH.TOKEN_MISSING,
                error: ""
            });
        }

        const token = authHeader.split(" ")[1];

        // ✅ Verify Token
        const decoded = TokenHandler.verifyToken(token);

        if (!decoded) {
            return APIResponse.error(res, {
                status: 401,
                message: Messages.AUTH.TOKEN_INVALID,
                error: "Invalid or expired token"
            });
        }

        // ✅ Fetch the user from the database
        const user = await User.findById(decoded.id);

        if (!user) {
            return APIResponse.error(res, {
                status: 404,
                message: "User not found",
                error: ""
            });
        }

        req.user = { id: user._id, role: user.role }; // Attach role to request
        next();
    } catch (error) {
        return APIResponse.error(res, {
            status: 500,
            message: "Authentication failed",
            error: error.message
        });
    }
};

module.exports = verifyToken;
