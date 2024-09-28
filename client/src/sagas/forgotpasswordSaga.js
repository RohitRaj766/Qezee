import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig'; 
import {
  REQUEST_PASSWORD_RESET,
  REQUEST_PASSWORD_RESET_SUCCESS,
  REQUEST_PASSWORD_RESET_FAILURE,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from '../actions/index';

const requestPasswordResetAPI = (email) => axiosInstance.post('/user/request-password-reset', { email });
const resetPasswordAPI = (token, email, newPassword) => axiosInstance.post('/user/reset-password', { token, email, newPassword });

function* requestPasswordResetSaga(action) {
  try {
    const response = yield call(requestPasswordResetAPI, action.payload);
    yield put({ type: REQUEST_PASSWORD_RESET_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: REQUEST_PASSWORD_RESET_FAILURE, payload: error.response.data });
  }
}

function* resetPasswordSaga(action) {
  try {
    const response = yield call(resetPasswordAPI, action.payload.token, action.payload.email, action.payload.newPassword);
    yield put({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: RESET_PASSWORD_FAILURE, payload: error.response.data });
  }
}

export default function* authSaga() {
  yield takeLatest(REQUEST_PASSWORD_RESET, requestPasswordResetSaga);
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga);
}
