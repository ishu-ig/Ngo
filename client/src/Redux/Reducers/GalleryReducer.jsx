import {
  CREATE_GALLERY_RED,
  DELETE_GALLERY_RED,
  GET_GALLERY_RED,
  UPDATE_GALLERY_RED,
} from "../Constants";

export default function GalleryReducer(state = [], action) {
  switch (action.type) {
    case CREATE_GALLERY_RED:
      return [...state, action.payload];

    case GET_GALLERY_RED:
      return action.payload || [];

    case UPDATE_GALLERY_RED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );

    case DELETE_GALLERY_RED:
      return state.filter((item) => item._id !== action.payload._id);

    default:
      return state;
  }
}
