const Messages = require("../utilities/message");
const APIResponse = require("../utilities/apiresponse");
const TokenHandler = require("../utilities/tokengenerator");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Ensure header key is lowercase

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return APIResponse.error(res, {
            status: 401,
            message: Messages.AUTH.TOKEN_MISSING,
            error: ""
        });
    }

    const token = authHeader.split(" ")[1];

    // Use TokenHandler to verify token
    const decoded = TokenHandler.verifyToken(token);

    if (!decoded) {
        return APIResponse.error(res, {
            status: 401,
            message: Messages.AUTH.TOKEN_INVALID,
            error: "Invalid or expired token"
        });
    }

    req.user = decoded;
    next();
};

module.exports = verifyToken;
