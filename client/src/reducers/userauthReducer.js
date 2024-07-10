import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../actions/index';

const initialState = {
  user: null,
  error: null,
  isAuthenticated: false,
  signupMessage: null,
  otpMessage: null,
  otpError: null,
};

const userauthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
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
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        otpMessage: action.payload,
        otpError: null,
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        otpMessage: null,
        otpError: action.payload,
      };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          isAuthenticated:false
        };
      case LOGOUT_FAILURE:
        return {
          ...state,
        };
    default:
      return state;
  }
};

export default userauthReducer;
