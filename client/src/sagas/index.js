import { all } from 'redux-saga/effects';
import leaderboardSaga from './leaderboardSaga';
import userSignupSaga from './userSignupSaga';
import userLoginSaga from './userLoginSaga';
import userLogoutSaga from './userLogoutSaga';
import userVerifyOtpSaga  from './userVerifyOtpSaga';
import verifyTokenSaga from './refreshHandlerSaga'
import fetchQuizList from './fetchquizlistSaga';
import fetchQuizQuestion from './fetchquizquestionSaga';
import submitResultSaga from './submitresultSaga';
import adminLoginSaga from './adminLoginSaga';
import userAttemptSaga from './userAttemptSaga';
import attemptedQuizList from './attemptedListSage';
import authSaga from './forgotpasswordSaga';
import LogoutAdminSaga from './adminLogoutSaga';
import createQuizSaga from './createQuizSaga';
export default function* rootSaga() {
  yield all([
    leaderboardSaga(),
    userSignupSaga(),
    userLoginSaga(),
    userLogoutSaga(),
    userVerifyOtpSaga(),
    verifyTokenSaga(),
    fetchQuizList(),
    fetchQuizQuestion(),
    submitResultSaga(),
    adminLoginSaga(),
    userAttemptSaga(),
    attemptedQuizList(),
    authSaga(),
    LogoutAdminSaga(),
    createQuizSaga()
  ]);
}
