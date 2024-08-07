import { call, put, takeEvery } from "redux-saga/effects";

import axiosInstance from "../axiosConfig";

import { getToken } from "../utils";

import {
  FETCH_QUIZ_REQUEST,
  fetchQuizSuccess,
  fetchQuizFailure,
} from "../actions/index";

function* fetchQuizQuestion(action) {
  const token = getToken();
  // console.log("Fetching quiz data for:", action.payload.title);
  const title = action.payload;

  if (token) {
    try {
      const response = yield call(
        axiosInstance.get,
        `/user/quiz-title/?title=${encodeURIComponent(title)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      yield put(fetchQuizSuccess(response.data));
      console.log("Quizquestion data:", response.data);
    } catch (error) {
      yield put(fetchQuizFailure(error.message));
    }
  } else {
    yield put(fetchQuizFailure("No user found"));
  }
}

export default function* watchFetchQuizQuestion() {
  yield takeEvery(FETCH_QUIZ_REQUEST, fetchQuizQuestion);
}
