const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Messages = require("../utilities/message");
const APIResponse = require("../utilities/apiresponse");
const TokenHandler = require("../utilities/tokengenerator");

const register = async (req, res) => {
    try {
        const { username, useremail, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ useremail });
        if (existingUser) {
            return APIResponse.error(res, {
                status: 400,
                message: Messages.USER.EMAIL_EXISTS,
                error: ""
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, useremail, password: hashedPassword, role });
        await newUser.save();

        return APIResponse.success(res, {
            status: 201,
            message: Messages.USER.SIGNUP_SUCCESS,
            data: { username, useremail, hashedPassword,role }
        });
    } catch (err) {
        console.error("Registration error:", err);
        return APIResponse.error(res, {
            status: 500,
            message: Messages.SYSTEM.SERVER_ERROR,
            error: err.message
        });
    }
};
const login = async (req, res) => {
    try {
        const { useremail, password } = req.body;
        const user = await User.findOne({ useremail });
        if (!user) {
            return APIResponse.error(res, {
                status: 404,
                message: Messages.USER.LOGIN_FAILED,
                error: ""
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return APIResponse.error(res, {
                status: 400,
                message: Messages.USER.LOGIN_FAILED,
                error: ""
            });
        }

        // Generate JWT Token
        const token = TokenHandler.generateToken(user);

        return APIResponse.success(res, {
            status: 200,
            message: Messages.USER.LOGIN_SUCCESS,
            data: { token, username: user.username }
        });
    } catch (err) {
        console.error("Login error:", err);
        return APIResponse.error(res, {
            status: 500,
            message: Messages.SYSTEM.SERVER_ERROR,
            error: err.message
        });
    }
};
module.exports = { register, login };

