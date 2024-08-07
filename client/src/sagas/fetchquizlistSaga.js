import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig'; 
import { getToken } from '../utils';
import { FETCH_QUIZ_LIST_REQUEST, fetchQuizListSuccess, fetchQuizListFailure } from '../actions/index';

// Worker Saga: Performs the async task
function* fetchQuizList() {
  const token = getToken();
  if(token)
  {
    try {
        const response = yield call(axiosInstance.get, '/user/quiz-list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        yield put(fetchQuizListSuccess(response.data));
        // console.log("ya toh data hai",response.data);
      
    }catch(error){
      yield put(fetchQuizListFailure(error.message));
    }

  }else{
    yield put(fetchQuizListFailure(false, 'No user found'));

  }
}

// Watcher Saga: Watches for actions and starts the worker saga
export default function* watchfetchQuizList() {
  yield takeEvery(FETCH_QUIZ_LIST_REQUEST, fetchQuizList);
}
