import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig';
import { getToken } from '../utils';
import { verifyTokenHandelRefreshSuccess, verifyTokenHandelRefreshFailure, VERIFY_TOKEN_HANDLE_REFRESH_REQUEST  } from '../actions/index';

function* verifyToken() {
  const token = getToken();
  if (token) {
    try {
      const response = yield call(axiosInstance.get, '/user/verify-token', {
        headers: { Authorization: `Bearer ${token}` },
      });
      yield put(verifyTokenHandelRefreshSuccess(true, response.data));
    } catch (error) {
      yield put(verifyTokenHandelRefreshFailure(false, null));
    }
  } else {
    yield put(verifyTokenHandelRefreshFailure(false, null));
  }
}

function* verifyTokenSaga() {
  yield takeEvery( VERIFY_TOKEN_HANDLE_REFRESH_REQUEST, verifyToken);
}

export default verifyTokenSaga;
