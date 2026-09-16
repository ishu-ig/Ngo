import {
  CREATE_PROJECT_RED,
  DELETE_PROJECT_RED,
  GET_PROJECT_RED,
  UPDATE_PROJECT_RED,
} from "../Constants";

export default function ProjectReducer(state = [], action) {
  switch (action.type) {
    case CREATE_PROJECT_RED:
      return [...state, action.payload];

    case GET_PROJECT_RED:
      return action.payload || [];

    case UPDATE_PROJECT_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_PROJECT_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
