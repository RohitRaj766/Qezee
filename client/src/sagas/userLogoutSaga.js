import { put, takeEvery } from 'redux-saga/effects';
import { LOGOUT_REQUEST, logoutSuccess, logoutFailure } from '../actions/index';
import HISTORY from '../utils/navigation';

function* handleLogout() {
  try {
   
    localStorage.removeItem('token');

  
    yield put(logoutSuccess());

  
    HISTORY.push('/login');
  } catch (error) {
  
    yield put(logoutFailure(error.message));

   
    console.error('Logout failed', error);
  }
}

function* logoutSaga() {
  yield takeEvery(LOGOUT_REQUEST, handleLogout);
}

export default logoutSaga;
