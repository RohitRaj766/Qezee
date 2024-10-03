import { call, put, takeEvery, select } from "redux-saga/effects";
import axiosInstance from "../axiosConfig";
import { getToken } from "../utils";
import {
  USER_ATTEMPT_REQUEST,
  userAttemptSuccess,
  userAttemptFailure
} from "../actions/index";

function* userAttempt(action) {
    try {
      const { quizId, userId, name, enrollment, correct, wrong, notattempted } = action.payload;
      if (!userId || !name) {
        throw new Error('User ID or name is missing');
      }
  
      const token = getToken();
  
      const response = yield call(
        axiosInstance.patch,
        `/user/quizzes/${quizId}/attempts`, 
        {
          quizId,
          userId,       
          name,          
          enrollment,    
          correctAnswers: correct,
          wrongAnswers: wrong,
          notattempted: notattempted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      yield put(userAttemptSuccess(response.data));
    } catch (error) {
      yield put(userAttemptFailure(error.message));
      console.error("Result submission failed:", error.message);
    }
}


export default function* userAttemptSaga() {
  yield takeEvery(USER_ATTEMPT_REQUEST, userAttempt);
}
