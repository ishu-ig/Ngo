import {
  CREATE_IMPACT,
  GET_IMPACT,
  UPDATE_IMPACT,
  DELETE_IMPACT,
} from "../Constants";

export function createImpact(payload) {
  return {
    type: CREATE_IMPACT,
    payload: payload,
  };
}

export function getImpact() {
  return {
    type: GET_IMPACT,
  };
}

export function updateImpact(payload) {
  return {
    type: UPDATE_IMPACT,
    payload: payload,
  };
}

export function deleteImpact(payload) {
  return {
    type: DELETE_IMPACT,
    payload: payload,
  };
}
