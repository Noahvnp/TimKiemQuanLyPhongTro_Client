import actionTypes from "./actionTypes";

import { apiGetRenter } from "../../services";

<<<<<<< HEAD
export const getRenters = (query) => async (dispatch) => {
  try {
    const response = await apiGetRenter(query);
=======
export const getRenters = (postId) => async (dispatch) => {
  try {
    const response = await apiGetRenter(postId);
>>>>>>> 6641730968f58f96e894e99fc326e9a0079faf8c
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_RENTERS_OF_POST,
        renters: response.data.response,
<<<<<<< HEAD
        count: response.data.response?.count || 0,
=======
>>>>>>> 6641730968f58f96e894e99fc326e9a0079faf8c
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
<<<<<<< HEAD

export const reGetRoom = () => ({
  type: actionTypes.NEW_ROOM,
});

export const reGetRenter = () => ({
  type: actionTypes.RE_GET_RENTERS_OF_POST,
});
=======
>>>>>>> 6641730968f58f96e894e99fc326e9a0079faf8c
