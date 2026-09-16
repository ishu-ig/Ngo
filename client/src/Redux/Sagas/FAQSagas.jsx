import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_FAQ,
  CREATE_FAQ_RED,
  DELETE_FAQ,
  DELETE_FAQ_RED,
  GET_FAQ,
  GET_FAQ_RED,
  UPDATE_FAQ,
  UPDATE_FAQ_RED,
} from "../Constants";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Service/ApiCallingService";

function* createSaga(action) {
  let response = yield createRecord("faq", action.payload);
  if (response && response.data) {
    yield put({ type: CREATE_FAQ_RED, payload: response.data });
  }
}

function* getSaga() {
  let response = yield getRecord("faq");
  if (response && response.data) {
    yield put({ type: GET_FAQ_RED, payload: response.data });
  }
}

function* updateSaga(action) {
  let response = yield updateRecord("faq", action.payload);
  if (response && response.data) {
    yield put({ type: UPDATE_FAQ_RED, payload: response.data });
  }
}

function* deleteSaga(action) {
  yield deleteRecord("faq", action.payload);
  yield put({ type: DELETE_FAQ_RED, payload: action.payload });
}

export default function* FAQSagas() {
  yield takeEvery(CREATE_FAQ, createSaga);
  yield takeEvery(GET_FAQ, getSaga);
  yield takeEvery(UPDATE_FAQ, updateSaga);
  yield takeEvery(DELETE_FAQ, deleteSaga);
}
