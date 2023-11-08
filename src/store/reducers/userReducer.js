import actionTypes from "../actions/actionTypes";

const initState = {
  current_user: {},
  users: {},
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER:
      return {
        ...state,
        current_user: action.current_user || {},
        msg: action.msg || "",
      };
    case actionTypes.GET_ALL_USERS:
      return {
        ...state,
        users: action.users || {},
        msg: action.msg || "",
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        current_user: {},
      };

    default:
      return state;
  }
};

export default userReducer;
