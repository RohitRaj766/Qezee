import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig';
import {setToken} from '../utils'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actions/index';

function* loginSaga(action) {
  try {
    const response = yield call(axiosInstance.post, '/user/login', action.payload);
    const token = response.data.authtoken;
    setToken(token);
    yield put({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error.response.data.error });
  }
}



export default function* userLoginSaga() {
    yield takeEvery(LOGIN_REQUEST, loginSaga)
}

