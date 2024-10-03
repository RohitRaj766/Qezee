import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig';
import { getAdminToken } from '../utils';


import {
  CREATE_QUIZ_REQUEST,
  CREATE_QUIZ_SUCCESS,
  CREATE_QUIZ_FAILURE,
} from '../actions/index';

function* createQuiz(action) {
  const token = getAdminToken();
  try {
    const response = yield call(axiosInstance.post, '/admin/createQuizzes', action.payload, {
      headers: { Authorization: `Bearer ${token}` }, 
    });
    yield put({ type: CREATE_QUIZ_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: CREATE_QUIZ_FAILURE, payload: error.response.data.error || error.response.data.message});
  }
}

export default function* createQuizSaga() {
    yield takeEvery(CREATE_QUIZ_REQUEST, createQuiz)
}

