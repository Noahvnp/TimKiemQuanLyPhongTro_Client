import actionTypes from "./actionTypes";

import { apiGetRenter } from "../../services";

export const getRenters = (postId) => async (dispatch) => {
  try {
    const response = await apiGetRenter(postId);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_RENTERS_OF_POST,
        renters: response.data.response,
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
