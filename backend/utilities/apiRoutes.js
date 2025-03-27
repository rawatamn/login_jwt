const API_VERSION="/api/v1"
export const API = {

  AUTH: `${API_VERSION}/auth`,
    USER: `${API_VERSION}/users`,
    MOVIE: `${API_VERSION}/movies`,
    CART: `${API_VERSION}/cart`,
    // Auth Routes
    REGISTER: "/register",
    LOGIN: "/login",
    ME: "/me",
  ALL_USERS: "/",
  CREATE_USER: "/",
  UPDATE_USER: "/:id",
  DELETE_USER: "/:id",
  USER_COUNT: "/count",
  TOTAL_REVENUE: "/total-revenue",
  // Movie Routes
  MOVIE_COUNT: "/moviecount",
  ALL_MOVIES: "/",
  SEARCH_MOVIE: "/search",
  MOVIE_BY_ID: "/:id",
  CREATE_MOVIE: "/",
  UPDATE_MOVIE: "/:id",
  DELETE_MOVIE: "/:id",
  // Cart Routes
  ADD_TO_CART: "/",
  INITIATE_PAYMENT: "/initiate-payment",
  UPDATE_CART: "/update/:userId/:movieId",
  GET_CART: "/:userId",
  REMOVE_FROM_CART: "/:userId/:movieId",
  CONFIRM_PAYMENT: "/confirm-payment",
  GET_ORDERS: "/orders/:userId",
  USER_REVENUE:"/user-revenue"
  };
  