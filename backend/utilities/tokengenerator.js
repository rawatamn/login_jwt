import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

class TokenHandler {
    static generateToken(user) {
        return jwt.sign(
            { 
                id: user._id.toString(), 
                email: user.email, 
                role: user.role 
            },
            process.env.JWT_SECRET,  
            { expiresIn: "1h" }
        );
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return null; 
        }
    }
}

export default TokenHandler;
