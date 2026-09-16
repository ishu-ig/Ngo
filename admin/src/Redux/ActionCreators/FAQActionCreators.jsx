import {
  CREATE_FAQ,
  GET_FAQ,
  UPDATE_FAQ,
  DELETE_FAQ,
} from "../Constants";

export function createFAQ(payload) {
  return {
    type: CREATE_FAQ,
    payload: payload,
  };
}

export function getFAQ() {
  return {
    type: GET_FAQ,
  };
}

export function updateFAQ(payload) {
  return {
    type: UPDATE_FAQ,
    payload: payload,
  };
}

export function deleteFAQ(payload) {
  return {
    type: DELETE_FAQ,
    payload: payload,
  };
}
