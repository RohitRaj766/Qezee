import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig';

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../actions/index';


function* signupSaga(action) {
    try {
      const response = yield call(axiosInstance.post, '/user/registration', action.payload);
      yield put({ type: SIGNUP_SUCCESS, payload: response.data.message });
    } catch (error) {
      yield put({ type: SIGNUP_FAILURE, payload: error.response.data.message });
    }
  }

  export default function* userSignupSaga() {
    yield takeEvery(SIGNUP_REQUEST, signupSaga)
}