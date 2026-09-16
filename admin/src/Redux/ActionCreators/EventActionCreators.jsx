import {
  CREATE_EVENT,
  GET_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from "../Constants";

export function createEvent(payload) {
  return {
    type: CREATE_EVENT,
    payload: payload,
  };
}

export function getEvent() {
  return {
    type: GET_EVENT,
  };
}

export function updateEvent(payload) {
  return {
    type: UPDATE_EVENT,
    payload: payload,
  };
}

export function deleteEvent(payload) {
  return {
    type: DELETE_EVENT,
    payload: payload,
  };
}
