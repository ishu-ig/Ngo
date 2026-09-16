import {
  CREATE_BLOG,
  GET_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
} from "../Constants";

export function createBlog(payload) {
  return {
    type: CREATE_BLOG,
    payload: payload,
  };
}

export function getBlog() {
  return {
    type: GET_BLOG,
  };
}

export function updateBlog(payload) {
  return {
    type: UPDATE_BLOG,
    payload: payload,
  };
}

export function deleteBlog(payload) {
  return {
    type: DELETE_BLOG,
    payload: payload,
  };
}