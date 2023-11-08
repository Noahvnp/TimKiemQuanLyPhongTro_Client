import actionTypes from "../actions/actionTypes";

const initState = {
  renters: {},
  msg: "",
};

const rentalReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_RENTERS_OF_POST:
      return {
        ...state,
        renters: action.renters || {},
        msg: action.msg || "",
      };

    default:
      return state;
  }
};

export default rentalReducer;
