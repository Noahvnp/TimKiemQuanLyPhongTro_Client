import actionTypes from "../actions/actionTypes";

const initState = {
  posts: [],
  new_posts: [],
  count: 0,
  msg: "",
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
    case actionTypes.GET_POSTS_LIMIT:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };

    case actionTypes.GET_NEW_POSTS:
      return {
        ...state,
        new_posts: action.new_posts || [],
        msg: action.msg || "",
      };

    default:
      return state;
  }
};

export default postReducer;
