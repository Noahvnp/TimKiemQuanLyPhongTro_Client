import actionTypes from "../actions/actionTypes";

const initState = {
  current_user: {},
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER:
      return {
        ...state,
        current_user: action.current_user || {},
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
