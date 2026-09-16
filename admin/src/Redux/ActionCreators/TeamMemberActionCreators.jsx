import {
  CREATE_TEAM_MEMBER,
  GET_TEAM_MEMBER,
  UPDATE_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
} from "../Constants";

export function createTeamMember(payload) {
  return {
    type: CREATE_TEAM_MEMBER,
    payload: payload,
  };
}

export function getTeamMember() {
  return {
    type: GET_TEAM_MEMBER,
  };
}

export function updateTeamMember(payload) {
  return {
    type: UPDATE_TEAM_MEMBER,
    payload: payload,
  };
}

export function deleteTeamMember(payload) {
  return {
    type: DELETE_TEAM_MEMBER,
    payload: payload,
  };
}
