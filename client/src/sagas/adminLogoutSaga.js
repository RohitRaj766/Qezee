import {put, takeEvery } from 'redux-saga/effects';
import { adminLogoutSuccess, adminLogoutFailure, ADMIN_LOGOUT_REQUEST } from '../actions/index';
import {removeAdminTokenFromCookies} from '../utils'

function* handleLogout() {
  try {
    removeAdminTokenFromCookies();
    yield put(adminLogoutSuccess());

  } catch (error) {
    yield put(adminLogoutFailure(error.message));
    console.error('Logout failed', error);
  }
}

  export default function* LogoutAdminSaga() {
    yield takeEvery(ADMIN_LOGOUT_REQUEST, handleLogout)
}