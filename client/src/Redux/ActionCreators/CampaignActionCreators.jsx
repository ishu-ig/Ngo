import {
  CREATE_CAMPAIGN,
  GET_CAMPAIGN,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN,
} from "../Constants";

export function createCampaign(payload) {
  return {
    type: CREATE_CAMPAIGN,
    payload: payload,
  };
}

export function getCampaign() {
  return {
    type: GET_CAMPAIGN,
  };
}

export function updateCampaign(payload) {
  return {
    type: UPDATE_CAMPAIGN,
    payload: payload,
  };
}

export function deleteCampaign(payload) {
  return {
    type: DELETE_CAMPAIGN,
    payload: payload,
  };
}
