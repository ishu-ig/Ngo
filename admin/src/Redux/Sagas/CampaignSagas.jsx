import { put, takeEvery } from "redux-saga/effects";
import {
  CREATE_CAMPAIGN,
  CREATE_CAMPAIGN_RED,
  DELETE_CAMPAIGN,
  DELETE_CAMPAIGN_RED,
  GET_CAMPAIGN,
  GET_CAMPAIGN_RED,
  UPDATE_CAMPAIGN,
  UPDATE_CAMPAIGN_RED,
} from "../Constants";
import {
  createMultipartRecord,
  deleteRecord,
  getRecord,
  updateMultipartRecord,
} from "./Service/ApiCallingService";

function* createSaga(action) {
  let response = yield createMultipartRecord("campaign", action.payload);
  if (response && response.data) {
    yield put({ type: CREATE_CAMPAIGN_RED, payload: response.data });
  }
}

function* getSaga() {
  let response = yield getRecord("campaign");
  if (response && response.data) {
    yield put({ type: GET_CAMPAIGN_RED, payload: response.data });
  }
}

function* updateSaga(action) {
  let response = yield updateMultipartRecord("campaign", action.payload);
  if (response && response.data) {
    yield put({ type: UPDATE_CAMPAIGN_RED, payload: response.data });
  }
}

function* deleteSaga(action) {
  yield deleteRecord("campaign", action.payload);
  yield put({ type: DELETE_CAMPAIGN_RED, payload: action.payload });
}

export default function* CampaignSagas() {
  yield takeEvery(CREATE_CAMPAIGN, createSaga);
  yield takeEvery(GET_CAMPAIGN, getSaga);
  yield takeEvery(UPDATE_CAMPAIGN, updateSaga);
  yield takeEvery(DELETE_CAMPAIGN, deleteSaga);
}
