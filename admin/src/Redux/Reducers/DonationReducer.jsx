import {
  CREATE_DONATION_RED,
  DELETE_DONATION_RED,
  GET_DONATION_RED,
  UPDATE_DONATION_RED,
} from "../Constants";

export default function DonationReducer(state = [], action) {
  switch (action.type) {
    case CREATE_DONATION_RED:
      return [...state, action.payload];

    case GET_DONATION_RED:
      return action.payload || [];

    case UPDATE_DONATION_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_DONATION_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
