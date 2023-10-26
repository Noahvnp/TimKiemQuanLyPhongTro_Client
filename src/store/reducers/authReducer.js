import actionTypes from "../actions/actionTypes";

const initState = {
  isLoggedIn: false,
  isAdmin: false,
  token: null,
  msg: "",
  update: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isAdmin: false,
        token: action.data,
        msg: "",
      };

    case actionTypes.LOGIN_ADMIN:
      return {
        ...state,
        isLoggedIn: true,
        isAdmin: true,
        token: action.data,
        msg: "",
      };

    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        token: null,
        msg: action.msg,
        update: !action.update,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        token: null,
      };

    case actionTypes.RESET_MSG:
      return {
        ...state,
        msg: action.msg || "",
      };

    default:
      return state;
  }
};

export default authReducer;
