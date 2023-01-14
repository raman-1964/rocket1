import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllEmailsApi,
  getSingleEmailApi,
} from "../../services/email.services";
import {
  getAllEmailFailed,
  getAllEmailSuccess,
  getSingleEmailFailed,
  getSingleEmailSuccess,
} from "../action/emailAction";
import {
  GET_ALL_EMAIL_REQUEST,
  GET_SINGLE_EMAIL_REQUEST,
} from "../constant/emailConstants";

function* getAllEmails(action) {
  try {
    const data = yield call(getAllEmailsApi, action.payload);
    let isNextPage = true;
    if (action.payload >= 2) isNextPage = false;
    yield put(
      getAllEmailSuccess({ page: action.payload, data, next: isNextPage })
    );
  } catch (error) {
    yield put(getAllEmailFailed(error));
  }
}

function* getSingleEmail(action) {
  try {
    const data = yield call(getSingleEmailApi, action.payload);
    yield put(getSingleEmailSuccess(data));
  } catch (error) {
    yield put(getSingleEmailFailed(error));
  }
}

function* courseSaga() {
  yield takeEvery(GET_ALL_EMAIL_REQUEST, getAllEmails);
  yield takeEvery(GET_SINGLE_EMAIL_REQUEST, getSingleEmail);
}

export default courseSaga;
