import {
  CREATE_PARTNER_RED,
  DELETE_PARTNER_RED,
  GET_PARTNER_RED,
  UPDATE_PARTNER_RED,
} from "../Constants";

export default function PartnerReducer(state = [], action) {
  switch (action.type) {
    case CREATE_PARTNER_RED:
      return [...state, action.payload];

    case GET_PARTNER_RED:
      return action.payload || [];

    case UPDATE_PARTNER_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_PARTNER_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
