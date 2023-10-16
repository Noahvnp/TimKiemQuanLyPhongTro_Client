import actionTypes from "../actions/actionTypes";

const initState = {
  posts: [],
  latest_posts: [],
  posts_current_user: [],
  dataEdit: null,
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

    case actionTypes.GET_LATEST_POSTS:
      return {
        ...state,
        latest_posts: action.latest_posts || [],
        msg: action.msg || "",
      };

    case actionTypes.GET_POSTS_ADMIN:
      return {
        ...state,
        posts_current_user: action.posts_current_user || [],
        msg: action.msg || "",
        count: action.count || 0,
      };

    case actionTypes.EDIT_POST:
      return {
        ...state,
        dataEdit: action.dataEdit || null,
      };

    case actionTypes.RESET_DATA_EDIT:
      return {
        ...state,
        dataEdit: null,
      };

    default:
      return state;
  }
};

export default postReducer;
