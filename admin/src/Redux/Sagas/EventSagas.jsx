import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_EVENT,
  CREATE_EVENT_RED,
  DELETE_EVENT,
  DELETE_EVENT_RED,
  GET_EVENT,
  GET_EVENT_RED,
  UPDATE_EVENT,
  UPDATE_EVENT_RED,
} from "../Constants";
import {
  createMultipartRecord,
  deleteRecord,
  getRecord,
  updateMultipartRecord,
} from "./Service/ApiCallingService";

function* createSaga(action) {
  let response = yield createMultipartRecord("event", action.payload);
  if (response && response.data) {
    yield put({ type: CREATE_EVENT_RED, payload: response.data });
  }
}

function* getSaga() {
  let response = yield getRecord("event");
  if (response && response.data) {
    yield put({ type: GET_EVENT_RED, payload: response.data });
  }
}

function* updateSaga(action) {
  let response = yield updateMultipartRecord("event", action.payload);
  if (response && response.data) {
    yield put({ type: UPDATE_EVENT_RED, payload: response.data });
  }
}

function* deleteSaga(action) {
  yield deleteRecord("event", action.payload);
  yield put({ type: DELETE_EVENT_RED, payload: action.payload });
}

export default function* EventSagas() {
  yield takeEvery(CREATE_EVENT, createSaga);
  yield takeEvery(GET_EVENT, getSaga);
  yield takeEvery(UPDATE_EVENT, updateSaga);
  yield takeEvery(DELETE_EVENT, deleteSaga);
}
