// sagas.js
import { call, put, takeEvery,select } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig'; 
import { getToken } from '../utils';
import { SUBMIT_RESULT_REQUEST, submitResultSuccess, submitResultFailure } from '../actions/index';

// const quizError=useSelector(state=>state.auth.LoginSuccess);
function* submitResultSaga(action) {
    try {
       
      const { quizTopic, correct, wrong, notattempted} = action.payload;
      const user = yield select(state => state.auth.user);
        const email = user && user.LoggedInUser? user.LoggedInUser.email : null;

        // console.log("email milgaya ",email);

      const token = getToken();
  
      const response = yield call(axiosInstance.patch, 
        `/user/submit-result/?email=${email}`, 
        { quizTopic, correct, wrong, notattempted }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          }
        }
      );
  
      yield put(submitResultSuccess(response.data));
      console.log("Result submission successful:", response.data);
    } catch (error) {
      yield put(submitResultFailure(error.message));
      console.error("Result submission failed:", error.message);
    }
  }

export default function* watchSubmitResultSaga() {
  yield takeEvery(SUBMIT_RESULT_REQUEST, submitResultSaga);
}
