import {put, takeEvery } from 'redux-saga/effects';
import { logoutSuccess, logoutFailure, LOGOUT_REQUEST } from '../actions/index';
import {removeTokenFromCookies} from '../utils'

function* handleLogout() {
  try {
    removeTokenFromCookies();
    yield put(logoutSuccess());

  } catch (error) {
    yield put(logoutFailure(error.message));
    console.error('Logout failed', error);
  }
}

  export default function* LogoutSaga() {
    yield takeEvery(LOGOUT_REQUEST, handleLogout)
}