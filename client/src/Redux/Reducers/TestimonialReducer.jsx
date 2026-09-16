import {
  CREATE_TESTIMONIAL_RED,
  DELETE_TESTIMONIAL_RED,
  GET_TESTIMONIAL_RED,
  UPDATE_TESTIMONIAL_RED,
} from "../Constants";

export default function TestimonialReducer(state = [], action) {
  switch (action.type) {
    case CREATE_TESTIMONIAL_RED:
      return [...state, action.payload];

    case GET_TESTIMONIAL_RED:
      return action.payload || [];

    case UPDATE_TESTIMONIAL_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_TESTIMONIAL_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
