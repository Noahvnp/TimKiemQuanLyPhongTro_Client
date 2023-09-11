import actionTypes from "../actions/actionTypes";

const initState = {
  categories: [],
  prices: [],
  acreages: [],
  msg: "",
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CATEGROIES:
      return {
        ...state,
        categories: action.categories || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_ALL_PRICES:
      return {
        ...state,
        prices: action.prices || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_ALL_ACREAGES:
      return {
        ...state,
        acreages: action.acreages || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default appReducer;
