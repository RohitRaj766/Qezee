import { all } from 'redux-saga/effects';
import leaderboardSaga from './leaderboardSaga';
import userSignupSaga from './userSignupSaga';
import userLoginSaga from './userLoginSaga';
import userLogoutSaga from './userLogoutSaga';
import userVerifyOtpSaga  from './userVerifyOtpSaga';
import verifyTokenSaga from './refreshHandlerSaga'
import watchfetchQuizList from './fetchquizlistSaga';
import watchFetchQuizQuestion from './fetchquizquestionSaga';
import watchSubmitResultSaga from './submitresultSaga';
export default function* rootSaga() {
  yield all([
    leaderboardSaga(),
    userSignupSaga(),
    userLoginSaga(),
    userLogoutSaga(),
    userVerifyOtpSaga(),
    verifyTokenSaga(),
    watchfetchQuizList(),
    watchFetchQuizQuestion(),
    watchSubmitResultSaga(),
  ]);
}
