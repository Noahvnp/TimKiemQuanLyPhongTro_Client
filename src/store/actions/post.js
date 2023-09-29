import actionTypes from "./actionTypes";
import {
  apiGetLatestPosts,
  apiGetPosts,
  apiGetPostsLimit,
} from "../../services/postService";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS,
      posts: null,
    });
  }
};

export const getPostsLimit = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_LIMIT,
      posts: null,
      count: 0,
    });
  }
};

export const getLatestPosts = () => async (dispatch) => {
  try {
    const response = await apiGetLatestPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_LATEST_POSTS,
        latest_posts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_LATEST_POSTS,
        msg: response.data.msg,
        latest_posts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_LATEST_POSTS,
      latest_posts: null,
    });
  }
};
