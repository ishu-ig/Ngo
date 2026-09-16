import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_USER,
  CREATE_USER_RED,
  DELETE_USER,
  DELETE_USER_RED,
  GET_USER,
  GET_USER_RED,
  UPDATE_USER,
  UPDATE_USER_RED,
} from "../Constants";
import {
  createMultipartRecord,
  deleteRecord,
  getRecord,
  updateMultipartRecord,
} from "./Service/ApiCallingService";

function* createSaga(action) {
  let response = yield createMultipartRecord("user", action.payload);
  if (response && response.data) {
    yield put({ type: CREATE_USER_RED, payload: response.data });
  }
}

function* getSaga() {
  let response = yield getRecord("user");
  if (response && response.data) {
    yield put({ type: GET_USER_RED, payload: response.data });
  }
}

function* updateSaga(action) {
  let response = yield updateMultipartRecord("user", action.payload);
  if (response && response.data) {
    yield put({ type: UPDATE_USER_RED, payload: response.data });
  }
}

function* deleteSaga(action) {
  yield deleteRecord("user", action.payload);
  yield put({ type: DELETE_USER_RED, payload: action.payload });
}

export default function* UserSagas() {
  yield takeEvery(CREATE_USER, createSaga);
  yield takeEvery(GET_USER, getSaga);
  yield takeEvery(UPDATE_USER, updateSaga);
  yield takeEvery(DELETE_USER, deleteSaga);
}
