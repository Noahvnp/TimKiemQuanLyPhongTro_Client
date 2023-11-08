import actionTypes from "./actionTypes";
import { apiGetAllUsers, apiGetCurrent } from "../../services";

export const getCurrentUser = () => async (dispatch) => {
  try {
    const response = await apiGetCurrent();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CURRENT_USER,
        current_user: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CURRENT_USER,
        msg: response.data.msg,
        current_user: null,
      });
      dispatch({ type: actionTypes.LOGOUT });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CURRENT_USER,
      current_user: null,
      msg: error,
    });
    dispatch({ type: actionTypes.LOGOUT });
  }
};

export const getAllUsers = (query) => async (dispatch) => {
  try {
    const response = await apiGetAllUsers(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_USERS,
        users: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_USERS,
        msg: response.data.msg,
        users: null,
      });
      dispatch({ type: actionTypes.LOGOUT });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_USERS,
      users: null,
      msg: error,
    });
    dispatch({ type: actionTypes.LOGOUT });
  }
};
