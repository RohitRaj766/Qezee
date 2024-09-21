import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig';
import {setToken} from '../utils'

import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
} from '../actions/index';

function* adminLoginSaga(action) {
  try {
    const response = yield call(axiosInstance.post, '/admin/login', action.payload);
    const token = response.data.authtoken;
    console.log("adminloginsaga :: ",response.data)
    setToken(token);
    yield put({ type: ADMIN_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADMIN_LOGIN_FAILURE, payload: error.response.data.error });
  }
}

export default function* adminLoginSaga() {
    yield takeEvery(ADMIN_LOGIN_REQUEST, adminLoginSaga)
}

