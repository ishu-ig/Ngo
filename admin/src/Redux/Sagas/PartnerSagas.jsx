import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_PARTNER,
  CREATE_PARTNER_RED,
  DELETE_PARTNER,
  DELETE_PARTNER_RED,
  GET_PARTNER,
  GET_PARTNER_RED,
  UPDATE_PARTNER,
  UPDATE_PARTNER_RED,
} from "../Constants";
import {
  createMultipartRecord,
  deleteRecord,
  getRecord,
  updateMultipartRecord,
} from "./Service/ApiCallingService";

function* createSaga(action) {
  let response = yield createMultipartRecord("partner", action.payload);
  if (response && response.data) {
    yield put({ type: CREATE_PARTNER_RED, payload: response.data });
  }
}

function* getSaga() {
  let response = yield getRecord("partner");
  if (response && response.data) {
    yield put({ type: GET_PARTNER_RED, payload: response.data });
  }
}

function* updateSaga(action) {
  let response = yield updateMultipartRecord("partner", action.payload);
  if (response && response.data) {
    yield put({ type: UPDATE_PARTNER_RED, payload: response.data });
  }
}

function* deleteSaga(action) {
  yield deleteRecord("partner", action.payload);
  yield put({ type: DELETE_PARTNER_RED, payload: action.payload });
}

export default function* PartnerSagas() {
  yield takeEvery(CREATE_PARTNER, createSaga);
  yield takeEvery(GET_PARTNER, getSaga);
  yield takeEvery(UPDATE_PARTNER, updateSaga);
  yield takeEvery(DELETE_PARTNER, deleteSaga);
}
