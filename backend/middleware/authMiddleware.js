import User from "../models/user.js"; // Add `.js` extension
import Messages from "../utilities/message.js";
import APIResponse from "../utilities/apiresponse.js";
import TokenHandler from "../utilities/tokengenerator.js";

export const verifyToken = async (req, res, next) => {
    try {
       

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
           
            return APIResponse.error(res, {
                status: 401,
                message: Messages.AUTH.TOKEN_MISSING,
                error: ""
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify Token
        const decoded = TokenHandler.verifyToken(token);
       

        if (!decoded || !decoded.id) {
            
            return APIResponse.error(res, {
                status: 401,
                message: Messages.AUTH.TOKEN_INVALID,
                error:Messages.AUTH.TOKEN_INVALID
            });
        }

        // Fetch the user from the database
        const user = await User.findById(decoded.id);
        if (!user) {
           
            return APIResponse.error(res, {
                status: 404,
                message: Messages.USER.NOT_FOUND,
                error: ""
            });
        }

        // Attach `id` properly in `req.user`
        req.user = {
            id: user._id.toString(), // Use `id` instead of `_id`
            role: user.role,
            username: user.username
        };

       
        next();
    } catch (error) {
        console.error(" Authentication Error:", error);
        return APIResponse.error(res, {
            status: 500,
            message: Messages.AUTH.AUTHENTICATION,
            error: error.message
        });
    }
};

export default verifyToken;
