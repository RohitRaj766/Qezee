import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig';
import { getAdminToken } from '../utils';


import {
  CREATE_QUIZ_REQUEST,
  CREATE_QUIZ_SUCCESS,
  CREATE_QUIZ_FAILURE,
} from '../actions/index';

function* createQuiz(action) {
  console.log("action.payload.quizData :: ", action.payload)
  const token = getAdminToken();
  try {
    const response = yield call(axiosInstance.post, '/admin/createQuizzes', action.payload, {
      headers: { Authorization: `Bearer ${token}` }, 
    });
    console.log("createQuiz saga response :: ", response.data);
    yield put({ type: CREATE_QUIZ_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: CREATE_QUIZ_FAILURE, payload: error.response.data.error || error.response.data.message});
    console.log("Error creating quiz: ", error.response.data);
  }
}

export default function* createQuizSaga() {
    yield takeEvery(CREATE_QUIZ_REQUEST, createQuiz)
}

