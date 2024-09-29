import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig'; 
import { ATTEMPTED_QUIZ_LIST_REQUEST, attemptedQuizListSuccess, attemptedQuizListFailure } from '../actions/index';


function* quizList() {
  try {
    const response = yield call(axiosInstance.get, '/user/quiz-list-userattempts');
    yield put(attemptedQuizListSuccess(response.data));
  } catch (error) {
    yield put(attemptedQuizListFailure(error.message));
  }
}


export default function* attemptedQuizList() {
  yield takeEvery(ATTEMPTED_QUIZ_LIST_REQUEST, quizList);
}
