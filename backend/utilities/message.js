const Messages = Object.freeze({
    USER: {
        LOGIN_SUCCESS: "Logged in successfully",
        LOGIN_FAILED: "Login failed! Invalid credentials",
        SIGNUP_SUCCESS: "User registered successfully",
        SIGNUP_FAILED: "User registration failed",
        EMAIL_EXISTS: "Email already in use",
        INVALID_EMAIL: "Invalid email format",
        PASSWORD_REQUIRED: "Password is required",
        PASSWORD_WEAK: "Password must be at least 8 characters long",
    },
    AUTH: {
        TOKEN_MISSING: "Authorization token is missing",
        TOKEN_INVALID: "Invalid or expired token",
        ACCESS_DENIED: "Access denied! Unauthorized user",
    },
    VALIDATION: {
        REQUIRED_FIELDS: "Please fill in all required fields",
        INVALID_INPUT: "Invalid input data",
    },
    SYSTEM: {
        SERVER_ERROR: "An unexpected error occurred. Please try again later",
        DATABASE_ERROR: "Database connection failed",
    },
    SUCCESS: {
        OPERATION_SUCCESS: "Operation completed successfully",
    },
    ERROR: {
        UNKNOWN_ERROR: "An unknown error occurred",
    }
});

export default Messages;
