import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
  } from '../actions/index';
  
  const initialState = {
    token: null,
    error: null,
    signupMessage: null,
  };
  
  const userauthReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          token: action.payload,
          error: null,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          token: null,
          error: action.payload,
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          signupMessage: action.payload,
          error: null,
        };
      case SIGNUP_FAILURE:
        return {
          ...state,
          signupMessage: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userauthReducer;
  