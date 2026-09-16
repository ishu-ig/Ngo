import {
  CREATE_CONTACT_US_RED,
  DELETE_CONTACT_US_RED,
  GET_CONTACT_US_RED,
  UPDATE_CONTACT_US_RED,
} from "../Constants";

export default function ContactUsReducer(state = [], action) {
  switch (action.type) {
    case CREATE_CONTACT_US_RED:
      return [...state, action.payload];

    case GET_CONTACT_US_RED:
      return action.payload || [];

    case UPDATE_CONTACT_US_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_CONTACT_US_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
