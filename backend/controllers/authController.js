import bcrypt from "bcryptjs";
import User from "../models/user.js"; // ✅ Add `.js` extension
import Messages from "../utilities/message.js";
import APIResponse from "../utilities/apiresponse.js";
import TokenHandler from "../utilities/tokengenerator.js";

// ✅ Register Function
export const register = async (req, res) => {
    try {
        const { username, useremail, password, role } = req.body;

        // Check if user already exists
        let user = await User.findOne({ useremail });
        if (user) {
            return APIResponse.error(res, {
                status: 400,
                message: "User already exists",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            username,
            useremail,
            password: hashedPassword,
            role: role || "user", // Default to "user"
        });

        await user.save();

        // Generate JWT token
        const token = TokenHandler.generateToken(user);

        return APIResponse.success(res, {
            status: 201,
            message: "User registered successfully",
            data: { token, username: user.username, role: user.role },
        });
    } catch (err) {
        console.error("Registration error:", err);
        return APIResponse.error(res, {
            status: 500,
            message: "Internal server error",
            error: err.message,
        });
    }
};

// ✅ Login Function
export const login = async (req, res) => {
    try {
        const { useremail, password } = req.body;
        const user = await User.findOne({ useremail });

        if (!user) {
            return APIResponse.error(res, {
                status: 404,
                message: Messages.USER.LOGIN_FAILED,
                error: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return APIResponse.error(res, {
                status: 400,
                message: Messages.USER.LOGIN_FAILED,
                error: "Incorrect password",
            });
        }

        // Generate JWT Token
        const token = TokenHandler.generateToken(user);

        return APIResponse.success(res, {
            status: 200,
            message: Messages.USER.LOGIN_SUCCESS,
            data: { 
                token, 
                username: user.username, 
                role: user.role // ✅ Include role in response
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        return APIResponse.error(res, {
            status: 500,
            message: Messages.SYSTEM.SERVER_ERROR,
            error: err.message,
        });
    }
};
