import {
  CREATE_EVENT_RED,
  DELETE_EVENT_RED,
  GET_EVENT_RED,
  UPDATE_EVENT_RED,
} from "../Constants";

export default function EventReducer(state = [], action) {
  switch (action.type) {
    case CREATE_EVENT_RED:
      return [...state, action.payload];

    case GET_EVENT_RED:
      return action.payload || [];

    case UPDATE_EVENT_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_EVENT_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
