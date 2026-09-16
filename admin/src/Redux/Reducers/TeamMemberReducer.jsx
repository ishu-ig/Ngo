import {
  CREATE_TEAM_MEMBER_RED,
  DELETE_TEAM_MEMBER_RED,
  GET_TEAM_MEMBER_RED,
  UPDATE_TEAM_MEMBER_RED,
} from "../Constants";

export default function TeamMemberReducer(state = [], action) {
  switch (action.type) {
    case CREATE_TEAM_MEMBER_RED:
      return [...state, action.payload];

    case GET_TEAM_MEMBER_RED:
      return action.payload || [];

    case UPDATE_TEAM_MEMBER_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_TEAM_MEMBER_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
