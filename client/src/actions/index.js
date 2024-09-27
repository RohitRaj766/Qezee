export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const FETCH_LEADERBOARD_REQUEST = "FETCH_LEADERBOARD_REQUEST";
export const FETCH_LEADERBOARD_SUCCESS = "FETCH_LEADERBOARD_SUCCESS";
export const FETCH_LEADERBOARD_FAILURE = "FETCH_LEADERBOARD_FAILURE";

export const VERIFY_OTP_REQUEST = "VERIFY_OTP_REQUEST";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAILURE = "VERIFY_OTP_FAILURE";

export const VERIFY_TOKEN_HANDLE_REFRESH_REQUEST =
  "VERIFY_TOKEN_HANDLE_REFRESH_REQUEST";
export const VERIFY_TOKEN_HANDLE_REFRESH_SUCCESS =
  "VERIFY_TOKEN_HANDLE_REFRESH_SUCCESS";
export const VERIFY_TOKEN_HANDLE_REFRESH_FAILURE =
  "VERIFY_TOKEN_HANDLE_REFRESH_FAILURE";

export const FETCH_QUIZ_LIST_REQUEST = "FETCH_QUIZ_LIST_REQUEST";
export const FETCH_QUIZ_LIST_SUCCESS = "FETCH_QUIZ_LIST_SUCCESS";
export const FETCH_QUIZ_LIST_FAILURE = "FETCH_QUIZ_LIST_FAILURE";

export const FETCH_QUIZ_REQUEST = "FETCH_QUIZ_REQUEST";
export const FETCH_QUIZ_SUCCESS = "FETCH_QUIZ_SUCCESS";
export const FETCH_QUIZ_FAILURE = "FETCH_QUIZ_FAILURE";

export const SUBMIT_RESULT_REQUEST = "SUBMIT_RESULT_REQUEST";
export const SUBMIT_RESULT_SUCCESS = "SUBMIT_RESULT_SUCCESS";
export const SUBMIT_RESULT_FAILURE = "SUBMIT_RESULT_FAILURE";

export const ADMIN_LOGIN_REQUEST = "ADMIN_LOGIN_REQUEST";
export const ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS";
export const ADMIN_LOGIN_FAILURE = "ADMIN_LOGIN_FAILURE";

export const USER_ATTEMPT_REQUEST = "USER_ATTEMPT_REQUEST";
export const USER_ATTEMPT_SUCCESS = "USER_ATTEMPT_SUCCESS";
export const USER_ATTEMPT_FAILURE = "USER_ATTEMPT_FAILURE";

export const ATTEMPTED_QUIZ_LIST_REQUEST = "ATTEMPTED_QUIZ_LIST_REQUEST";
export const ATTEMPTED_QUIZ_LIST_SUCCESS = "ATTEMPTED_QUIZ_LIST_SUCCESS";
export const ATTEMPTED_QUIZ_LIST_FAILURE = "ATTEMPTED_QUIZ_LIST_FAILURE";

export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const signupRequest = (userData) => ({
  type: SIGNUP_REQUEST,
  payload: userData,
});

export const signupSuccess = (message) => ({
  type: SIGNUP_SUCCESS,
  payload: message,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
export const logoutFailure = () => ({
  type: LOGOUT_FAILURE,
});

export const fetchLeaderboardRequest = () => ({
  type: FETCH_LEADERBOARD_REQUEST,
});

export const fetchLeaderboardSuccess = (data) => ({
  type: FETCH_LEADERBOARD_SUCCESS,
  payload: data,
});

export const fetchLeaderboardFailure = (error) => ({
  type: FETCH_LEADERBOARD_FAILURE,
  payload: error,
});

export const verifyOtpRequest = (otpData) => ({
  type: VERIFY_OTP_REQUEST,
  payload: otpData,
});

export const verifyOtpSuccess = (message) => ({
  type: VERIFY_OTP_SUCCESS,
  payload: message,
});

export const verifyOtpFailure = (error) => ({
  type: VERIFY_OTP_FAILURE,
  payload: error,
});

export const verifyTokenHandelRefreshRequest = () => ({
  type: VERIFY_TOKEN_HANDLE_REFRESH_REQUEST
});

export const verifyTokenHandelRefreshSuccess = (isAuthenticated, user) => {
  return {
    type: VERIFY_TOKEN_HANDLE_REFRESH_SUCCESS,
    payload: { isAuthenticated, user }
  };
};

export const verifyTokenHandelRefreshFailure = (isAuthenticated, user) => {
  return {
    type: VERIFY_TOKEN_HANDLE_REFRESH_FAILURE,
    payload: { isAuthenticated, user }
  };
};

export const fetchQuizListRequest = () => ({
  type: FETCH_QUIZ_LIST_REQUEST,
});

export const fetchQuizListSuccess = (data) => ({
  type: FETCH_QUIZ_LIST_SUCCESS,
  payload: data,
});

export const fetchQuizListFailure = (error) => ({
  type: FETCH_QUIZ_LIST_FAILURE,
  payload: error,
});

export const fetchQuizRequest = (title) => ({
  type: FETCH_QUIZ_REQUEST,
  payload: title,
});

export const fetchQuizSuccess = (data) => ({
  type: FETCH_QUIZ_SUCCESS,
  payload: data,
});

export const fetchQuizFailure = (error) => ({
  type: FETCH_QUIZ_FAILURE,
  payload: error,
});

export const submitResultRequest = (resultData) => ({
  type: SUBMIT_RESULT_REQUEST,
  payload: resultData,
});

export const submitResultSuccess = (response) => ({
  type: SUBMIT_RESULT_SUCCESS,
  payload: response,
});

export const submitResultFailure = (error) => ({
  type: SUBMIT_RESULT_FAILURE,
  payload: error,
});

export const adminLoginRequest = (credentials) => ({
  type: ADMIN_LOGIN_REQUEST,
  payload: credentials,
});

export const adminLoginSuccess = (token) => ({
  type: ADMIN_LOGIN_SUCCESS,
  payload: token,
});

export const adminLoginFailure = (error) => ({
  type: ADMIN_LOGIN_FAILURE,
  payload: error,
});

export const userAttemptRequest = (attemptData) => ({
  type: USER_ATTEMPT_REQUEST,
  payload: attemptData,
});

export const userAttemptSuccess = (response) => ({
  type: USER_ATTEMPT_SUCCESS,
  payload: response,
});

export const userAttemptFailure = (error) => ({
  type: USER_ATTEMPT_FAILURE,
  payload: error,
});


export const attemptedQuizListRequest = () => ({
  type: ATTEMPTED_QUIZ_LIST_REQUEST,
});

export const attemptedQuizListSuccess = (data) => ({
  type: ATTEMPTED_QUIZ_LIST_SUCCESS,
  payload: data,
});

export const attemptedQuizListFailure = (error) => ({
  type: ATTEMPTED_QUIZ_LIST_FAILURE,
  payload: error,
});