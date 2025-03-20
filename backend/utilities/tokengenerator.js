const jwt = require("jsonwebtoken");
require("dotenv").config();

class TokenHandler {
    static generateToken(user) {
        // Generate a JWT token with user details and a 1-hour expiry
        return jwt.sign(
            { 
                id: user._id.toString(), 
                email: user.email, 
                role: user.role 
            },
            process.env.JWT_SECRET,  // Ensure .env has JWT_SECRET
            { expiresIn: "1h" }
        );
    }

    static verifyToken(token) {
        try {
            // Verify and decode the token
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return null; // Return null if token verification fails
        }
    }
}

module.exports = TokenHandler;
