import { combineReducers } from 'redux';
import userauthReducer from './userauthReducer';

const rootReducer = combineReducers({
  auth: userauthReducer
  // Add more reducers here 
});

export default rootReducer;
