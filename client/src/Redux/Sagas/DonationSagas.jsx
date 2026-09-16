import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_DONATION,
  CREATE_DONATION_RED,
  DELETE_DONATION,
  DELETE_DONATION_RED,
  GET_DONATION,
  GET_DONATION_RED,
  UPDATE_DONATION,
  UPDATE_DONATION_RED,
} from "../Constants";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Service/ApiCallingService";

function* createSaga(action) {
  let response = yield createRecord("donation", action.payload);
  if (response && response.data) {
    yield put({ type: CREATE_DONATION_RED, payload: response.data });
  }
}

function* getSaga() {
  let response = yield getRecord("donation");
  if (response && response.data) {
    yield put({ type: GET_DONATION_RED, payload: response.data });
  }
}

function* updateSaga(action) {
  let response = yield updateRecord("donation", action.payload);
  if (response && response.data) {
    yield put({ type: UPDATE_DONATION_RED, payload: response.data });
  }
}

function* deleteSaga(action) {
  yield deleteRecord("donation", action.payload);
  yield put({ type: DELETE_DONATION_RED, payload: action.payload });
}

export default function* DonationSagas() {
  yield takeEvery(CREATE_DONATION, createSaga);
  yield takeEvery(GET_DONATION, getSaga);
  yield takeEvery(UPDATE_DONATION, updateSaga);
  yield takeEvery(DELETE_DONATION, deleteSaga);
}
