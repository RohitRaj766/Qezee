import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosConfig';
import { getToken } from '../utils';
import { FETCH_LEADERBOARD_REQUEST, fetchLeaderboardSuccess, fetchLeaderboardFailure } from '../actions';

function* fetchLeaderboardSaga() {
  try {
    const token = getToken('token');
    const response = yield call(axiosInstance.get, '/user/leaderboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    yield put(fetchLeaderboardSuccess(response.data));
  } catch (error) {
    yield put(fetchLeaderboardFailure(error.message));
  }
}

export default function* leaderboardSaga() {
  yield takeEvery(FETCH_LEADERBOARD_REQUEST, fetchLeaderboardSaga);
}
