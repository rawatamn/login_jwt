export const API = {
    USERS: "/api/users",
    MOVIES: "/api/movies",
    AUTH: "/api/auth",
    CART: "/api/cart",
    ORDERS: "/api/cart/orders",
    // User API Endpoints
    USER_COUNT: "/count",
    TOTAL_REVENUE: "/total-revenue",
  
    // Movie API Endpoints
    MOVIE_SEARCH: "/search",
    MOVIE_COUNT: "/moviecount",
  
    // Auth API Endpoints
    AUTH_REGISTER: "/register",
    AUTH_LOGIN: "/login",
  
    // Cart API Endpoints
    CART_ADD: "/",
    CART_UPDATE: "/update/:userId/:movieId",
    CART_GET: "/:userId",
    CART_REMOVE: "/:userId/:movieId",
    CART_INITIATE_PAYMENT: "/initiate-payment",
    CART_CONFIRM_PAYMENT: "/confirm-payment",
    CART_ORDERS: "/orders",
  };
  