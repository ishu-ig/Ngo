import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_IMPACT,
  CREATE_IMPACT_RED,
  DELETE_IMPACT,
  DELETE_IMPACT_RED,
  GET_IMPACT,
  GET_IMPACT_RED,
  UPDATE_IMPACT,
  UPDATE_IMPACT_RED,
} from "../Constants";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Service/ApiCallingService";

function* createSaga(action) {
  let response = yield createRecord("impact", action.payload);
  if (response && response.data) {
    yield put({ type: CREATE_IMPACT_RED, payload: response.data });
  }
}

function* getSaga() {
  let response = yield getRecord("impact");
  if (response && response.data) {
    yield put({ type: GET_IMPACT_RED, payload: response.data });
  }
}

function* updateSaga(action) {
  let response = yield updateRecord("impact", action.payload);
  if (response && response.data) {
    yield put({ type: UPDATE_IMPACT_RED, payload: response.data });
  }
}

function* deleteSaga(action) {
  yield deleteRecord("impact", action.payload);
  yield put({ type: DELETE_IMPACT_RED, payload: action.payload });
}

export default function* ImpactSagas() {
  yield takeEvery(CREATE_IMPACT, createSaga);
  yield takeEvery(GET_IMPACT, getSaga);
  yield takeEvery(UPDATE_IMPACT, updateSaga);
  yield takeEvery(DELETE_IMPACT, deleteSaga);
}
