import {
  CREATE_VOLUNTEER_RED,
  DELETE_VOLUNTEER_RED,
  GET_VOLUNTEER_RED,
  UPDATE_VOLUNTEER_RED,
} from "../Constants";

export default function VolunteerReducer(state = [], action) {
  switch (action.type) {
    case CREATE_VOLUNTEER_RED:
      return [...state, action.payload];

    case GET_VOLUNTEER_RED:
      return action.payload || [];

    case UPDATE_VOLUNTEER_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_VOLUNTEER_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
