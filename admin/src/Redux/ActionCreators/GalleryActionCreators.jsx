import {
  CREATE_GALLERY,
  GET_GALLERY,
  UPDATE_GALLERY,
  DELETE_GALLERY,
} from "../Constants";

export function createGallery(payload) {
  return {
    type: CREATE_GALLERY,
    payload: payload,
  };
}

export function getGallery() {
  return {
    type: GET_GALLERY,
  };
}

export function updateGallery(payload) {
  return {
    type: UPDATE_GALLERY,
    payload: payload,
  };
}

export function deleteGallery(payload) {
  return {
    type: DELETE_GALLERY,
    payload: payload,
  };
}
