import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_GALLERY,
  CREATE_GALLERY_RED,
  DELETE_GALLERY,
  DELETE_GALLERY_RED,
  GET_GALLERY,
  GET_GALLERY_RED,
  UPDATE_GALLERY,
  UPDATE_GALLERY_RED,
} from "../Constants";
import {
  createMultipartRecord,
  deleteRecord,
  getRecord,
  updateMultipartRecord,
} from "./Service/ApiCallingService";

function* createSaga(action) {
  let response = yield createMultipartRecord("gallery", action.payload);
  if (response && response.data) {
    yield put({ type: CREATE_GALLERY_RED, payload: response.data });
  }
}

function* getSaga() {
  let response = yield getRecord("gallery");
  if (response && response.data) {
    yield put({ type: GET_GALLERY_RED, payload: response.data });
  }
}

function* updateSaga(action) {
  let response = yield updateMultipartRecord("gallery", action.payload);
  if (response && response.data) {
    yield put({ type: UPDATE_GALLERY_RED, payload: response.data });
  }
}

function* deleteSaga(action) {
  yield deleteRecord("gallery", action.payload);
  yield put({ type: DELETE_GALLERY_RED, payload: action.payload });
}

export default function* GallerySagas() {
  yield takeEvery(CREATE_GALLERY, createSaga);
  yield takeEvery(GET_GALLERY, getSaga);
  yield takeEvery(UPDATE_GALLERY, updateSaga);
  yield takeEvery(DELETE_GALLERY, deleteSaga);
}
