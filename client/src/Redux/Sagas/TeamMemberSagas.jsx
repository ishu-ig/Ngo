import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_TEAM_MEMBER,
  CREATE_TEAM_MEMBER_RED,
  DELETE_TEAM_MEMBER,
  DELETE_TEAM_MEMBER_RED,
  GET_TEAM_MEMBER,
  GET_TEAM_MEMBER_RED,
  UPDATE_TEAM_MEMBER,
  UPDATE_TEAM_MEMBER_RED,
} from "../Constants";
import {
  createMultipartRecord,
  deleteRecord,
  getRecord,
  updateMultipartRecord,
} from "./Service/ApiCallingService";

function* createSaga(action) {
  let response = yield createMultipartRecord("teammember", action.payload);
  if (response && response.data) {
    yield put({ type: CREATE_TEAM_MEMBER_RED, payload: response.data });
  }
}

function* getSaga() {
  let response = yield getRecord("teammember");
  if (response && response.data) {
    yield put({ type: GET_TEAM_MEMBER_RED, payload: response.data });
  }
}

function* updateSaga(action) {
  let response = yield updateMultipartRecord("teammember", action.payload);
  if (response && response.data) {
    yield put({ type: UPDATE_TEAM_MEMBER_RED, payload: response.data });
  }
}

function* deleteSaga(action) {
  yield deleteRecord("teammember", action.payload);
  yield put({ type: DELETE_TEAM_MEMBER_RED, payload: action.payload });
}

export default function* TeamMemberSagas() {
  yield takeEvery(CREATE_TEAM_MEMBER, createSaga);
  yield takeEvery(GET_TEAM_MEMBER, getSaga);
  yield takeEvery(UPDATE_TEAM_MEMBER, updateSaga);
  yield takeEvery(DELETE_TEAM_MEMBER, deleteSaga);
}
