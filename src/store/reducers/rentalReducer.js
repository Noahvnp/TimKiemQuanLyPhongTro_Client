import actionTypes from "../actions/actionTypes";

const initState = {
  renters: {},
  msg: "",
  count: 0,
  reGetRoom: false,
  reGetRenter: false,
};

const rentalReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_RENTERS_OF_POST:
      return {
        ...state,
        renters: action.renters || {},
        msg: action.msg || "",
        count: action.count || 0,
      };

    case actionTypes.NEW_ROOM:
      return {
        ...state,
        reGetRoom: true,
      };

    case actionTypes.RE_GET_RENTERS_OF_POST:
      return {
        ...state,
        reGetRenter: true,
      };
    default:
      return state;
  }
};

export default rentalReducer;
