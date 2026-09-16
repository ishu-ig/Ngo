import {
  CREATE_DONATION,
  GET_DONATION,
  UPDATE_DONATION,
  DELETE_DONATION,
} from "../Constants";

export function createDonation(payload) {
  return {
    type: CREATE_DONATION,
    payload: payload,
  };
}

export function getDonation() {
  return {
    type: GET_DONATION,
  };
}

export function updateDonation(payload) {
  return {
    type: UPDATE_DONATION,
    payload: payload,
  };
}

export function deleteDonation(payload) {
  return {
    type: DELETE_DONATION,
    payload: payload,
  };
}
