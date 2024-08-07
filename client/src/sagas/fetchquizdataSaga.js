import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig'; 
import { getToken } from '../utils';
import { FETCH_DATA_REQUEST, fetchDataSuccess, fetchDataFailure } from '../actions/index';

// Worker Saga: Performs the async task
function* fetchQuizData() {
  const token = getToken();
  if(token)
  {
    try {
        const response = yield call(axiosInstance.get, '/user/quiz-list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        yield put(fetchDataSuccess(response.data));
        // console.log("ya toh data hai",response.data);
      
    }catch(error){
      yield put(fetchDataFailure(error.message));
    }

  }else{
    yield put(fetchDataFailure(false, 'No user found'));

  }
}

// Watcher Saga: Watches for actions and starts the worker saga
export default function* fetchuserdataSaga() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchQuizData);
}
