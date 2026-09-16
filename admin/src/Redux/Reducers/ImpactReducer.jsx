import {
  CREATE_IMPACT_RED,
  DELETE_IMPACT_RED,
  GET_IMPACT_RED,
  UPDATE_IMPACT_RED,
} from "../Constants";

export default function ImpactReducer(state = [], action) {
  switch (action.type) {
    case CREATE_IMPACT_RED:
      return [...state, action.payload];

    case GET_IMPACT_RED:
      return action.payload || [];

    case UPDATE_IMPACT_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_IMPACT_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
