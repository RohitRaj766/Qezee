import { all } from 'redux-saga/effects';
import leaderboardSaga from './leaderboardSaga';
import userSignupSaga from './userSignupSaga';
import userLoginSaga from './userLoginSaga';
import userLogoutSaga from './userLogoutSaga';
import userVerifyOtpSaga  from './userVerifyOtpSaga';

export default function* rootSaga() {
  yield all([
    leaderboardSaga(),
    userSignupSaga(),
    userLoginSaga(),
    userLogoutSaga(),
    userVerifyOtpSaga()
  ]);
}
