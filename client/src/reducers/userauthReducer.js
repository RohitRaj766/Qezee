import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
  } from '../actions/index';
  
  const token = localStorage.getItem('token');

  const initialState = {
    user: null,
    error: null,
    isAuthenticated: false,
    signupMessage: null
  };


  
  const userauthReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          isAuthenticated:true,
          error: null,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          user: null,
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
  