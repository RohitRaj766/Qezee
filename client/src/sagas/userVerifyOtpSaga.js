import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig';
import { VERIFY_OTP_REQUEST, verifyOtpSuccess, verifyOtpFailure } from '../actions';

function* verifyOtpSaga(action) {
  try {
    const response = yield call(axiosInstance.post, '/user/verify-otp', action.payload);
    yield put(verifyOtpSuccess(response.data.message));
  } catch (error) {
    yield put(verifyOtpFailure(error.response.data.error));
  }
}

export default function* userVerifyOtpSaga() {
  yield takeEvery(VERIFY_OTP_REQUEST, verifyOtpSaga);
}
