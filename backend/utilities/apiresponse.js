class APIResponse {
    static success(res, { status = 200, message = "OK", data = {} }) {
        return res.status(status).json({ status, message, data });
    }

    static error(res, { status = 500, message = "Internal Server Error", error = "Unknown error occurred" }) {
        console.error("API Error:", { status, message, error }); // Log error
        return res.status(status).json({ status, message, error });
    }
}

export default APIResponse;
