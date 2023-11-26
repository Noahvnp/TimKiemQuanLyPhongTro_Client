import actionTypes from "./actionTypes";

import {
  apiGetContract,
  apiGetPayment,
  apiGetRenter,
  apiGetYourPayment,
} from "../../services";

export const getRenters = (query) => async (dispatch) => {
  try {
    const response = await apiGetRenter(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_RENTERS_OF_POST,
        renters: response.data.response,
        count: response.data.response?.count || 0,
      });
    } else {
      dispatch({
        type: actionTypes.GET_RENTERS_OF_POST,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_RENTERS_OF_POST,
      renters: null,
      msg: error,
    });
  }
};

export const getContract = () => async (dispatch) => {
  try {
    const response = await apiGetContract();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CONTRACT_OF_POST,
        contracts: response.data.response?.rows,
        count: response.data.response?.count || 0,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CONTRACT_OF_POST,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CONTRACT_OF_POST,
      contracts: null,
      msg: error,
    });
  }
};

export const reGetRoom = () => ({
  type: actionTypes.NEW_ROOM,
});

export const reGetRenter = () => ({
  type: actionTypes.RE_GET_RENTERS_OF_POST,
});

export const getPayments = () => async (dispatch) => {
  try {
    const response = await apiGetPayment();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_PAYMENTS,
        payments: response.data.response?.rows,
        count: response.data.response?.count || 0,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PAYMENTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PAYMENTS,
      payments: null,
      msg: error,
    });
  }
};

export const getYourPayments = () => async (dispatch) => {
  try {
    const response = await apiGetYourPayment({
      paymentStatus: "Chưa thanh toán",
    });
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_YOUR_PAYMENTS,
        your_payment: response.data.response?.rows,
        count: response.data.response?.count || 0,
      });
    } else {
      dispatch({
        type: actionTypes.GET_YOUR_PAYMENTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_YOUR_PAYMENTS,
      your_payment: null,
      msg: error,
    });
  }
};

export const verifyPayment = (paymentId) => ({
  type: actionTypes.VERIFY_PAYMENT,
  paymentId,
});
