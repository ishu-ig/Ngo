import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_VOLUNTEER,
  CREATE_VOLUNTEER_RED,
  DELETE_VOLUNTEER,
  DELETE_VOLUNTEER_RED,
  GET_VOLUNTEER,
  GET_VOLUNTEER_RED,
  UPDATE_VOLUNTEER,
  UPDATE_VOLUNTEER_RED,
} from "../Constants";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Service/ApiCallingService";

function* createSaga(action) {
  let response = yield createRecord("volunteer", action.payload);
  if (response && response.data) {
    yield put({ type: CREATE_VOLUNTEER_RED, payload: response.data });
  }
}

function* getSaga() {
  let response = yield getRecord("volunteer");
  if (response && response.data) {
    yield put({ type: GET_VOLUNTEER_RED, payload: response.data });
  }
}

function* updateSaga(action) {
  let response = yield updateRecord("volunteer", action.payload);
  if (response && response.data) {
    yield put({ type: UPDATE_VOLUNTEER_RED, payload: response.data });
  }
}

function* deleteSaga(action) {
  yield deleteRecord("volunteer", action.payload);
  yield put({ type: DELETE_VOLUNTEER_RED, payload: action.payload });
}

export default function* VolunteerSagas() {
  yield takeEvery(CREATE_VOLUNTEER, createSaga);
  yield takeEvery(GET_VOLUNTEER, getSaga);
  yield takeEvery(UPDATE_VOLUNTEER, updateSaga);
  yield takeEvery(DELETE_VOLUNTEER, deleteSaga);
}
