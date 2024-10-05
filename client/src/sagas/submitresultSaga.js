import { call, put, takeEvery, select } from "redux-saga/effects";
import axiosInstance from "../axiosConfig";
import { getToken } from "../utils";
import {
  SUBMIT_RESULT_REQUEST,
  submitResultSuccess,
  submitResultFailure
} from "../actions/index";

function* submitResult(action) {
  try {
    const {quizId, quizTopic, correct, wrong, notattempted,quizStatus } = action.payload;
    const user = yield select((state) => state.auth.user);
    const email = user && user.LoggedInUser ? user.LoggedInUser.email : null;

    const token = getToken();

    const response = yield call(
      axiosInstance.patch,
      `/user/submit-result/?email=${email}`,
      {quizId, quizTopic, correct, wrong, notattempted,quizStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    yield put(submitResultSuccess(response.data));
  } catch (error) {
    yield put(submitResultFailure(error.message));
    console.error("Result submission failed:", error.message);
  }
}

export default function* submitResultSaga() {
  yield takeEvery(SUBMIT_RESULT_REQUEST, submitResult);
}
