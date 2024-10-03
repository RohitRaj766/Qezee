import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig';


import {
  CREATE_QUIZ_REQUEST,
  CREATE_QUIZ_SUCCESS,
  CREATE_QUIZ_FAILURE,
} from '../actions/index';

function* adminLogin(action) {
  try {
    const response = yield call(axiosInstance.post, '/admin/login', action.payload);
    const token = response.data.authtoken;
    console.log("adminloginsaga :: ",response.data)
    yield put({ type: CREATE_QUIZ_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: CREATE_QUIZ_FAILURE, payload: error.response.data.message});
    console.log("error.response.data.error ",error.response.data.message);
  }
}

export default function* adminLoginSaga() {
    yield takeEvery(CREATE_QUIZ_REQUEST, adminLogin)
}

