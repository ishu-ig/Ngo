import {
  CREATE_TESTIMONIAL,
  GET_TESTIMONIAL,
  UPDATE_TESTIMONIAL,
  DELETE_TESTIMONIAL,
} from "../Constants";

export function createTestimonial(payload) {
  return {
    type: CREATE_TESTIMONIAL,
    payload: payload,
  };
}

export function getTestimonial() {
  return {
    type: GET_TESTIMONIAL,
  };
}

export function updateTestimonial(payload) {
  return {
    type: UPDATE_TESTIMONIAL,
    payload: payload,
  };
}

export function deleteTestimonial(payload) {
  return {
    type: DELETE_TESTIMONIAL,
    payload: payload,
  };
}