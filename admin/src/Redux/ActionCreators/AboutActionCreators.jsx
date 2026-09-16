import {
  CREATE_ABOUT,
  GET_ABOUT,
  UPDATE_ABOUT,
  DELETE_ABOUT,
} from "../Constants";

export function createAbout(payload) {
  return {
    type: CREATE_ABOUT,
    payload: payload,
  };
}

export function getAbout() {
  return {
    type: GET_ABOUT,
  };
}

export function updateAbout(payload) {
  return {
    type: UPDATE_ABOUT,
    payload: payload,
  };
}

export function deleteAbout(payload) {
  return {
    type: DELETE_ABOUT,
    payload: payload,
  };
}