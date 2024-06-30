import { all } from 'redux-saga/effects';
import leaderboardSaga from './leaderboardSaga';

export default function* rootSaga() {
  yield all([
    leaderboardSaga(),
  ]);
}
