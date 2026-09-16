import {
  CREATE_PROJECT,
  GET_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "../Constants";

export function createProject(payload) {
  return {
    type: CREATE_PROJECT,
    payload: payload,
  };
}

export function getProject() {
  return {
    type: GET_PROJECT,
  };
}

export function updateProject(payload) {
  return {
    type: UPDATE_PROJECT,
    payload: payload,
  };
}

export function deleteProject(payload) {
  return {
    type: DELETE_PROJECT,
    payload: payload,
  };
}
