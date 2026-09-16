import {
  CREATE_FAQ_RED,
  DELETE_FAQ_RED,
  GET_FAQ_RED,
  UPDATE_FAQ_RED,
} from "../Constants";

export default function FAQReducer(state = [], action) {
  switch (action.type) {
    case CREATE_FAQ_RED:
      return [...state, action.payload];

    case GET_FAQ_RED:
      return action.payload || [];

    case UPDATE_FAQ_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_FAQ_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
