import { combineReducers } from 'redux';
import leaderboardReducer from './leaderboardReducer';
import userauthReducer from './userauthReducer';

const rootReducer = combineReducers({
  leaderboard: leaderboardReducer,
  auth: userauthReducer
  // Add more reducers here 
});

export default rootReducer;
