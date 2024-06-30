import { combineReducers } from 'redux';
import leaderboardReducer from './leaderboardReducer';

const rootReducer = combineReducers({
  leaderboard: leaderboardReducer,
  // Add more reducers here 
});

export default rootReducer;
