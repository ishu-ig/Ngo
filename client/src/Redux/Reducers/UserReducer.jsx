import {
  CREATE_USER_RED,
  DELETE_USER_RED,
  GET_USER_RED,
  UPDATE_USER_RED,
} from "../Constants";

export default function UserReducer(state = [], action) {
  switch (action.type) {
    case CREATE_USER_RED:
      return [...state, action.payload];

    case GET_USER_RED:
      return action.payload || [];

    case UPDATE_USER_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_USER_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
