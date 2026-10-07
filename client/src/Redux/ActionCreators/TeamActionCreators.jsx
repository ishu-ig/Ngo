import {
  CREATE_TEAM,
  GET_TEAM,
  UPDATE_TEAM,
  DELETE_TEAM,
} from "../Constants";

export function createTeam(payload) {
  return {
    type: CREATE_TEAM,
    payload: payload,
  };
}

export function getTeam() {
  return {
    type: GET_TEAM,
  };
}

export function updateTeam(payload) {
  return {
    type: UPDATE_TEAM,
    payload: payload,
  };
}

export function deleteTeam(payload) {
  return {
    type: DELETE_TEAM,
    payload: payload,
  };
}
