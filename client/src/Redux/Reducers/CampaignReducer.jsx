import {
  CREATE_CAMPAIGN_RED,
  DELETE_CAMPAIGN_RED,
  GET_CAMPAIGN_RED,
  UPDATE_CAMPAIGN_RED,
} from "../Constants";

export default function CampaignReducer(state = [], action) {
  switch (action.type) {
    case CREATE_CAMPAIGN_RED:
      return [...state, action.payload];

    case GET_CAMPAIGN_RED:
      return action.payload || [];

    case UPDATE_CAMPAIGN_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_CAMPAIGN_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
