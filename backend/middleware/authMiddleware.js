const User = require("../models/user");
const Messages = require("../utilities/message");
const APIResponse = require("../utilities/apiresponse");
const TokenHandler = require("../utilities/tokengenerator");

const verifyToken = async (req, res, next) => {
    try {
        console.log("🔹 Verifying Token...");

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("❌ No Authorization Header Found");
            return APIResponse.error(res, {
                status: 401,
                message: Messages.AUTH.TOKEN_MISSING,
                error: ""
            });
        }

        const token = authHeader.split(" ")[1];

        // ✅ Verify Token
        const decoded = TokenHandler.verifyToken(token);
        console.log("🔍 Decoded Token:", decoded);

        if (!decoded || !decoded.id) {
            console.log("❌ Token verification failed or missing user ID");
            return APIResponse.error(res, {
                status: 401,
                message: Messages.AUTH.TOKEN_INVALID,
                error: "Invalid or expired token"
            });
        }

        // ✅ Fetch the user from the database
        const user = await User.findById(decoded.id);
        if (!user) {
            console.log("❌ User not found in DB for ID:", decoded.id);
            return APIResponse.error(res, {
                status: 404,
                message: "User not found",
                error: ""
            });
        }

        // ✅ Attach `id` properly in `req.user`
        req.user = {
            id: user._id.toString(), // ✅ Use `id` instead of `_id`
            role: user.role,
            username: user.username
        };

        console.log("✅ User Authenticated:", req.user);
        next();
    } catch (error) {
        console.error("❌ Authentication Error:", error);
        return APIResponse.error(res, {
            status: 500,
            message: "Authentication failed",
            error: error.message
        });
    }
};

module.exports = verifyToken;


