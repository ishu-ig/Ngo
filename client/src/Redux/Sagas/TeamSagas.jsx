import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_TEAM,
  CREATE_TEAM_RED,
  DELETE_TEAM,
  DELETE_TEAM_RED,
  GET_TEAM,
  GET_TEAM_RED,
  UPDATE_TEAM,
  UPDATE_TEAM_RED,
} from "../Constants";
import {
  createMultipartRecord,
  deleteRecord,
  getRecord,
  updateMultipartRecord,
} from "./Service/ApiCallingService";

function* createSaga(action) {
  let response = yield createMultipartRecord("team", action.payload);
  if (response && response.data) {
    yield put({ type: CREATE_TEAM_RED, payload: response.data });
  }
}

function* getSaga() {
  let response = yield getRecord("team");
  if (response && response.data) {
    yield put({ type: GET_TEAM_RED, payload: response.data });
  }
}

function* updateSaga(action) {
  let response = yield updateMultipartRecord("team", action.payload);
  if (response && response.data) {
    yield put({ type: UPDATE_TEAM_RED, payload: response.data });
  }
}

function* deleteSaga(action) {
  yield deleteRecord("team", action.payload);
  yield put({ type: DELETE_TEAM_RED, payload: action.payload });
}

export default function* TeamSagas() {
  yield takeEvery(CREATE_TEAM, createSaga);
  yield takeEvery(GET_TEAM, getSaga);
  yield takeEvery(UPDATE_TEAM, updateSaga);
  yield takeEvery(DELETE_TEAM, deleteSaga);
}
