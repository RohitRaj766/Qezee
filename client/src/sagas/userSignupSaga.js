import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig';

import {
  SIGNUP_REQUEST,
  signupSuccess,
  signupFailure,
} from '../actions/index';


function* signupSaga(action) {
    try {
      const response = yield call(axiosInstance.post, '/user/registration', action.payload);
      yield put(signupSuccess( response.data.message));
    } catch (error) {
      yield put(signupFailure(error.response.data.error));
    }
  }

  export default function* userSignupSaga() {
    yield takeEvery(SIGNUP_REQUEST, signupSaga)
}