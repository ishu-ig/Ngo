import {
  CREATE_BLOG_RED,
  DELETE_BLOG_RED,
  GET_BLOG_RED,
  UPDATE_BLOG_RED,
} from "../Constants";

export default function BlogReducer(state = [], action) {
  switch (action.type) {
    case CREATE_BLOG_RED:
      return [...state, action.payload];

    case GET_BLOG_RED:
      return action.payload || [];

    case UPDATE_BLOG_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_BLOG_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
