import actionTypes from "../actions/actionTypes";

const initState = {
  renters: {},
  msg: "",
<<<<<<< HEAD
  count: 0,
  reGetRoom: false,
  reGetRenter: false,
=======
>>>>>>> 6641730968f58f96e894e99fc326e9a0079faf8c
};

const rentalReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_RENTERS_OF_POST:
      return {
        ...state,
        renters: action.renters || {},
        msg: action.msg || "",
<<<<<<< HEAD
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
=======
      };

>>>>>>> 6641730968f58f96e894e99fc326e9a0079faf8c
    default:
      return state;
  }
};

export default rentalReducer;
