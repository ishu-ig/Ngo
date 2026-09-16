import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_BLOG,
  CREATE_BLOG_RED,
  DELETE_BLOG,
  DELETE_BLOG_RED,
  GET_BLOG,
  GET_BLOG_RED,
  UPDATE_BLOG,
  UPDATE_BLOG_RED,
} from "../Constants";
import {
  createMultipartRecord,
  deleteRecord,
  getRecord,
  updateMultipartRecord,
} from "./Service/ApiCallingService";

function* createSaga(action) {
  let response = yield createMultipartRecord("blog", action.payload);
  if (response && response.data) {
    yield put({ type: CREATE_BLOG_RED, payload: response.data });
  }
}

function* getSaga() {
  let response = yield getRecord("blog");
  if (response && response.data) {
    yield put({ type: GET_BLOG_RED, payload: response.data });
  }
}

function* updateSaga(action) {
  let response = yield updateMultipartRecord("blog", action.payload);
  if (response && response.data) {
    yield put({ type: UPDATE_BLOG_RED, payload: response.data });
  }
}

function* deleteSaga(action) {
  yield deleteRecord("blog", action.payload);
  yield put({ type: DELETE_BLOG_RED, payload: action.payload });
}

export default function* BlogSagas() {
  yield takeEvery(CREATE_BLOG, createSaga);
  yield takeEvery(GET_BLOG, getSaga);
  yield takeEvery(UPDATE_BLOG, updateSaga);
  yield takeEvery(DELETE_BLOG, deleteSaga);
}