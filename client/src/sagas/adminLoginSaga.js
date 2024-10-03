import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig';
import {setAdminToken} from '../utils'

import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
} from '../actions/index';

function* adminLogin(action) {
  try {
    const response = yield call(axiosInstance.post, '/admin/login', action.payload);
    const token = response?.data?.authToken;
    setAdminToken(token);
    yield put({ type: ADMIN_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADMIN_LOGIN_FAILURE, payload: error.response.data.error || error.response.data.message});
    console.log("error.response.data.error ",error.response.data);
  }
}

export default function* adminLoginSaga() {
    yield takeEvery(ADMIN_LOGIN_REQUEST, adminLogin)
}

