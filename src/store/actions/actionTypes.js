const actionTypes = {
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",

  GET_POSTS: "GET_POSTS",
  GET_POSTS_LIMIT: "GET_POSTS_LIMIT",
  GET_POSTS_ADMIN: "GET_POSTS_ADMIN",
  GET_LATEST_POSTS: "GET_LATEST_POSTS",
  GET_OUTSTANDING_POSTS: "GET_OUTSTANDING_POSTS",
  EDIT_POST: "EDIT_POST",
  RESET_DATA_EDIT: "RESET_DATA_EDIT",
  RESET_MSG: "RESET_MSG",

  GET_ALL_CATEGROIES: "GET_ALL_CATEGROIES",
  GET_ALL_PRICES: "GET_ALL_PRICES",
  GET_ALL_ACREAGES: "GET_ALL_ACREAGES",
  GET_ALL_PROVINCES: "GET_ALL_PROVINCES",

  // USER
  GET_CURRENT_USER: "GET_CURRENT_USER",

  GET_RENTERS_OF_POST: "GET_RENTERS_OF_POST",
  RE_GET_RENTERS_OF_POST: "RE_GET_RENTERS_OF_POST",
  GET_CONTRACT_OF_POST: "GET_CONTRACT_OF_POST",
  GET_PAYMENTS: "GET_PAYMENTS",
  VERIFY_PAYMENT: "VERIFY_PAYMENT",
  RE_GET_PAYMENT: "RE_GET_PAYMENT",
  RE_GET_YOUR_PAYMENT: "RE_GET_YOUR_PAYMENT",
  GET_YOUR_PAYMENTS: "GET_YOUR_PAYMENTS",
  NEW_ROOM: "NEW_ROOM",

  LOGIN_ADMIN: "LOGIN_ADMIN",
  GET_ALL_USERS: "GET_ALL_USERS",
};

export default actionTypes;
