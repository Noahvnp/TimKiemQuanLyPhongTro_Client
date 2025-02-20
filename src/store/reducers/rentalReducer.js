import actionTypes from "../actions/actionTypes";

const initState = {
  renters: {},
  contracts: [],
  payments: [],
  your_payment: [],
  paymentId: "id",
  msg: "",
  count: 0,
  reGetRoom: false,
  reGetRenter: false,
  reGetPayment: false,
  reGetYourPayment: false,
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

    case actionTypes.GET_CONTRACT_OF_POST:
      return {
        ...state,
        contracts: action.contracts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };

    case actionTypes.GET_PAYMENTS:
      return {
        ...state,
        payments: action.payments || [],
        msg: action.msg || "",
        count: action.count || 0,
      };

    case actionTypes.GET_YOUR_PAYMENTS:
      return {
        ...state,
        your_payment: action.your_payment || [],
        msg: action.msg || "",
        count: action.count || 0,
      };

    case actionTypes.VERIFY_PAYMENT:
      return {
        ...state,
        paymentId: action.paymentId || null,
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

    case actionTypes.RE_GET_PAYMENT:
      return {
        ...state,
        reGetPayment: true,
      };

    case actionTypes.RE_GET_YOUR_PAYMENT:
      return {
        ...state,
        reGetYourPayment: true,
      };
    default:
      return state;
  }
};

export default rentalReducer;
