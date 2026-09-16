import {
  CREATE_VOLUNTEER,
  GET_VOLUNTEER,
  UPDATE_VOLUNTEER,
  DELETE_VOLUNTEER,
} from "../Constants";

export function createVolunteer(payload) {
  return {
    type: CREATE_VOLUNTEER,
    payload: payload,
  };
}

export function getVolunteer() {
  return {
    type: GET_VOLUNTEER,
  };
}

export function updateVolunteer(payload) {
  return {
    type: UPDATE_VOLUNTEER,
    payload: payload,
  };
}

export function deleteVolunteer(payload) {
  return {
    type: DELETE_VOLUNTEER,
    payload: payload,
  };
}
