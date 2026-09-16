import {
  CREATE_CONTACT_US,
  GET_CONTACT_US,
  UPDATE_CONTACT_US,
  DELETE_CONTACT_US,
} from "../Constants";

export function createContactUs(payload) {
  return {
    type: CREATE_CONTACT_US,
    payload: payload,
  };
}

export function getContactUs() {
  return {
    type: GET_CONTACT_US,
  };
}

export function updateContactUs(payload) {
  return {
    type: UPDATE_CONTACT_US,
    payload: payload,
  };
}

export function deleteContactUs(payload) {
  return {
    type: DELETE_CONTACT_US,
    payload: payload,
  };
}