import { call, put, takeEvery } from "redux-saga/effects";

import axiosInstance from "../axiosConfig";

import { getToken } from "../utils";

import {
  FETCH_QUIZ_REQUEST,
  fetchQuizSuccess,
  fetchQuizFailure,
} from "../actions/index";

function* quizQuestion(action) {
  const token = getToken();
  const id = action.payload;

  if (token) {
    try {
      const response = yield call(
        axiosInstance.get,
        `/user/quiz-id/?id=${encodeURIComponent(id)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      yield put(fetchQuizSuccess(response.data));

    } catch (error) {
      yield put(fetchQuizFailure(error.message));
    }
  } else {
    yield put(fetchQuizFailure("No user found"));
  }
}

export default function* fetchQuizQuestion() {
  yield takeEvery(FETCH_QUIZ_REQUEST, quizQuestion);
}
