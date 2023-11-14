import actionTypes from "./actionTypes";

import { apiGetRenter } from "../../services";

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

export const reGetRoom = () => ({
  type: actionTypes.NEW_ROOM,
});

export const reGetRenter = () => ({
  type: actionTypes.RE_GET_RENTERS_OF_POST,
});
