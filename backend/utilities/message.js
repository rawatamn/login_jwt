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
        NOT_FOUND: "User not found",
        ID_MISSING: "User ID missing from request",
        USER_DETAIL: "Error fetching user detail",
        FETCH_USER: "Error fetching users",
        USER_CREATION: "User created successfully",
        ERROR_CREATE: "Error creating user",
        USER_UPDATE: "User updated successfully",
        USER_NOT_UPDATE: "Error updating user",
        DELETED: "User deleted successfully",
        ERROR_DELETE: "Error deleting user",
        ERROR_COUNT: "Error fetching user count",
        INCORRECT_PASSWORD:"Password is incorrect",
    },
    MOVIE: {
        MOVIE_NOT_FOUND: "Movie not found",
        MOVIE_ID_MISSING: "Movie ID missing from request",
        INVALID_MOVIE_ID: "Invalid movie ID format",
        MOVIE_FETCH_ERROR: "Error fetching movies",
        MOVIE_SEARCH_ERROR: "Error searching for movies",
        MOVIE_CREATION_SUCCESS: "Movie created successfully",
        MOVIE_CREATION_ERROR: "Error creating movie",
        MOVIE_UPDATE_SUCCESS: "Movie updated successfully",
        MOVIE_UPDATE_ERROR: "Error updating movie",
        MOVIE_DELETE_SUCCESS: "Movie deleted successfully",
        MOVIE_DELETE_ERROR: "Error deleting movie",
        MOVIE_COUNT_ERROR: "Error fetching movie count",
        SERVER: "Server Error",
        REQIRE_FIELD: "All Field Required",
        MOVIE_ADDED: "Movie Added Successfully",
        ERROR_MOVIE_ADD: "Error in adding Movie",
    },
    SUPERADMIN: {
        SUPERADMIN_ONLY: "Access denied. SuperAdmin only",
    },
    AUTH: {
        TOKEN_MISSING: "Authorization token is missing",
        TOKEN_INVALID: "Invalid or expired token",
        ACCESS_DENIED: "Access denied! Unauthorized user",
        INVALID_TOKEN: "Invalid token. User ID missing.",
        LOGIN_REQUIRED: "You must be logged in to access this resource",
        INCORRECT_PASSWORD: "Incorrect password",
        USER_ALREADY_EXISTS: "User already exists",
        AUTHENTICATION: "Authentication Failed",
        USER_ID_REQUIRED: "User ID is required",
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
        SERVER_ERROR: "An unexpected error occurred",
    },
    REVENUE: {
        TOTAL_REVENUE_ERROR: "Error in calculating total revenue",
    },
    CART: {
        ADDED: "Movie added to cart",
        UPDATED: "Cart updated successfully",
        REMOVED: "Movie removed from cart",
        EMPTY: "Cart is empty",
        NOT_FOUND: "Cart not found",
        MOVIE_NOT_IN_CART: "Movie not in cart",
        MIN_QUANTITY: "Quantity must be at least 1",
    },
    PAYMENT: {
        INITIATED: "Payment initiated successfully",
        CONFIRMED: "Payment confirmed successfully",
    },
    MONGODB:{
        MONGODB_ERROR:"Mongodb connection error"
    }
});

export default Messages;
