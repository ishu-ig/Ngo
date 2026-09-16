import {
  CREATE_USER,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../Constants";

export function createUser(payload) {
  return {
    type: CREATE_USER,
    payload: payload,
  };
}

export function getUser() {
  return {
    type: GET_USER,
  };
}

export function updateUser(payload) {
  return {
    type: UPDATE_USER,
    payload: payload,
  };
}

export function deleteUser(payload) {
  return {
    type: DELETE_USER,
    payload: payload,
  };
}
