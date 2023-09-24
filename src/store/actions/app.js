import actionTypes from "./actionTypes";
import {
  apiGetAllCategories,
  apiGetAllPrices,
  apiGetAllAcreages,
  apiGetAllProvinces,
} from "../../services";

export const getAllCategories = () => async (dispatch) => {
  try {
    const response = await apiGetAllCategories();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_CATEGROIES,
        categories: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_CATEGROIES,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_CATEGROIES,
      categories: null,
      msg: error,
    });
  }
};

export const getAllPrices = () => async (dispatch) => {
  try {
    const response = await apiGetAllPrices();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_PRICES,
        prices: response.data.response.sort((a, b) => +a.order - +b.order),
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_PRICES,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_PRICES,
      prices: null,
      msg: error,
    });
  }
};

export const getAllAcreages = () => async (dispatch) => {
  try {
    const response = await apiGetAllAcreages();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_ACREAGES,
        acreages: response.data.response.sort((a, b) => +a.order - +b.order),
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_ACREAGES,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_PRICES,
      prices: null,
      msg: error,
    });
  }
};

export const getAllProvinces = () => async (dispatch) => {
  try {
    const response = await apiGetAllProvinces();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_PROVINCES,
        provinces: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_PROVINCES,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_PROVINCES,
      provinces: null,
      msg: error,
    });
  }
};
