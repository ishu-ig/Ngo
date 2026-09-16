import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_PROJECT,
  CREATE_PROJECT_RED,
  DELETE_PROJECT,
  DELETE_PROJECT_RED,
  GET_PROJECT,
  GET_PROJECT_RED,
  UPDATE_PROJECT,
  UPDATE_PROJECT_RED,
} from "../Constants";
import {
  createMultipartRecord,
  deleteRecord,
  getRecord,
  updateMultipartRecord,
} from "./Service/ApiCallingService";

function* createSaga(action) {
  let response = yield createMultipartRecord("project", action.payload);
  if (response && response.data) {
    yield put({ type: CREATE_PROJECT_RED, payload: response.data });
  }
}

function* getSaga() {
  let response = yield getRecord("project");
  if (response && response.data) {
    yield put({ type: GET_PROJECT_RED, payload: response.data });
  }
}

function* updateSaga(action) {
  let response = yield updateMultipartRecord("project", action.payload);
  if (response && response.data) {
    yield put({ type: UPDATE_PROJECT_RED, payload: response.data });
  }
}

function* deleteSaga(action) {
  yield deleteRecord("project", action.payload);
  yield put({ type: DELETE_PROJECT_RED, payload: action.payload });
}

export default function* ProjectSagas() {
  yield takeEvery(CREATE_PROJECT, createSaga);
  yield takeEvery(GET_PROJECT, getSaga);
  yield takeEvery(UPDATE_PROJECT, updateSaga);
  yield takeEvery(DELETE_PROJECT, deleteSaga);
}
