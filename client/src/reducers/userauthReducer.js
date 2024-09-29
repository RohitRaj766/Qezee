import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  VERIFY_OTP_REQUEST,
  VERIFY_TOKEN_HANDLE_REFRESH_SUCCESS,
  VERIFY_TOKEN_HANDLE_REFRESH_FAILURE,
  VERIFY_TOKEN_HANDLE_REFRESH_REQUEST,
  FETCH_LEADERBOARD_REQUEST,
  FETCH_LEADERBOARD_SUCCESS,
  FETCH_LEADERBOARD_FAILURE,
  FETCH_QUIZ_LIST_REQUEST,
  FETCH_QUIZ_LIST_SUCCESS,
  FETCH_QUIZ_LIST_FAILURE,
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_FAILURE,
  FETCH_QUIZ_SUCCESS,
  SUBMIT_RESULT_FAILURE,
  SUBMIT_RESULT_SUCCESS,
  SUBMIT_RESULT_REQUEST,
  USER_ATTEMPT_REQUEST,
  USER_ATTEMPT_SUCCESS,
  USER_ATTEMPT_FAILURE,
  ATTEMPTED_QUIZ_LIST_REQUEST,
  ATTEMPTED_QUIZ_LIST_SUCCESS,
  ATTEMPTED_QUIZ_LIST_FAILURE,
  REQUEST_PASSWORD_RESET,
  REQUEST_PASSWORD_RESET_SUCCESS,
  REQUEST_PASSWORD_RESET_FAILURE,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../actions/index";

const initialState = {
  user: null,
  error: null,
  isAuthenticated: false,
  signupMessage: null,
  otpMessage: null,
  otpError: null,
  isLoading: false,
  leaderboardData: [],
  fetchedData: [],
  fetchDataError: null,
  quizData: null,
  quizError: null,
  resultSubmissionSuccess: false,
  resultSubmissionError: null,
  attemptedQuizzes:[],
  message:null
};

const userauthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupMessage: action.payload,
        isLoading: false,
        error: null
      };

    case SIGNUP_FAILURE:
      return {
        ...state,
        signupMessage: null,
        isLoading: false,
        error: action.payload
      };

    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        otpMessage: action.payload,
        isLoading: false,
        otpError: null
      };

    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        otpMessage: null,
        isLoading: false,
        otpError: action.payload
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };

    case LOGOUT_FAILURE:
      return {
        ...state
      };


    case VERIFY_TOKEN_HANDLE_REFRESH_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case VERIFY_TOKEN_HANDLE_REFRESH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user
      };
      
    case VERIFY_TOKEN_HANDLE_REFRESH_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: action.payload.user
      };
    case FETCH_LEADERBOARD_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_LEADERBOARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        leaderboardData: action.payload,
        error: null
      };
    case FETCH_LEADERBOARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case FETCH_QUIZ_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_QUIZ_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fetchedData: action.payload,
        fetchDataError: null,
      };

    case FETCH_QUIZ_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        fetchedData: [],
        fetchDataError: action.payload,
      };
    case FETCH_QUIZ_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        isLoading: false,
        quizData: action.payload,
        quizError: null,
      };

    case FETCH_QUIZ_FAILURE:
      return {
        ...state,
        isLoading: false,
        quizData: null,
        quizError: action.payload,
      };

    case SUBMIT_RESULT_REQUEST:
      return {
        ...state,
        isLoading: true,
        resultSubmissionError: null,
      };
    case SUBMIT_RESULT_SUCCESS:
      return { ...state, isLoading: false, resultSubmissionSuccess: true };
    case SUBMIT_RESULT_FAILURE:
      return {
        ...state,
        isLoading: false,
        resultSubmissionError: action.payload,
      };
      case USER_ATTEMPT_REQUEST:
      return {
        ...state,
        isLoading: true,
        resultSubmissionError: null,
      };

    case USER_ATTEMPT_SUCCESS:
      return { 
        ...state, 
        isLoading: false, 
        resultSubmissionSuccess: true 
      };

    case USER_ATTEMPT_FAILURE:
      return {
        ...state,
        isLoading: false,
        resultSubmissionError: action.payload,
      };

      case ATTEMPTED_QUIZ_LIST_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case ATTEMPTED_QUIZ_LIST_SUCCESS:
        return {
          ...state,
          isLoading: false,
          attemptedQuizzes: action.payload,
          error: null,
        };
  
      case ATTEMPTED_QUIZ_LIST_FAILURE:
        return {
          ...state,
          isLoading: false,
          attemptedQuizzes: [],
          error: action.payload,
        };
        
        case REQUEST_PASSWORD_RESET:
          return { ...state, loading: true, error: null };
        case REQUEST_PASSWORD_RESET_SUCCESS:
          return { ...state, loading: false, message: action.payload.message };
        case REQUEST_PASSWORD_RESET_FAILURE:
          return { ...state, loading: false, error: action.payload.error };
        case RESET_PASSWORD:
          return { ...state, loading: true, error: null };
        case RESET_PASSWORD_SUCCESS:
          return { ...state, loading: false, message: action.payload.message };
        case RESET_PASSWORD_FAILURE:
          return { ...state, loading: false, error: action.payload.error };  
    default:
      return state;
  }
};

export default userauthReducer;
