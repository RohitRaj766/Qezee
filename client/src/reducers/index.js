import { combineReducers } from 'redux';
import userauthReducer from './userauthReducer';
import adminauthReducer from './adminauthReducer';

const rootReducer = combineReducers({
  auth: userauthReducer,
  adminauth: adminauthReducer
  // Add more reducers here 
});

export default rootReducer;
