import {
  CREATE_TEAM_RED,
  DELETE_TEAM_RED,
  GET_TEAM_RED,
  UPDATE_TEAM_RED,
} from "../Constants";

export default function TeamReducer(state = [], action) {
  switch (action.type) {
    case CREATE_TEAM_RED:
      return [...state, action.payload];

    case GET_TEAM_RED:
      return action.payload;

    case UPDATE_TEAM_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_TEAM_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
