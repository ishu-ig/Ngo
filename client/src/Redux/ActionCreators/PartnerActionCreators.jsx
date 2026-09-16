import {
  CREATE_PARTNER,
  GET_PARTNER,
  UPDATE_PARTNER,
  DELETE_PARTNER,
} from "../Constants";

export function createPartner(payload) {
  return {
    type: CREATE_PARTNER,
    payload: payload,
  };
}

export function getPartner() {
  return {
    type: GET_PARTNER,
  };
}

export function updatePartner(payload) {
  return {
    type: UPDATE_PARTNER,
    payload: payload,
  };
}

export function deletePartner(payload) {
  return {
    type: DELETE_PARTNER,
    payload: payload,
  };
}
