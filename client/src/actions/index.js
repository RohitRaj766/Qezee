
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const FETCH_LEADERBOARD_REQUEST = 'FETCH_LEADERBOARD_REQUEST';
export const FETCH_LEADERBOARD_SUCCESS = 'FETCH_LEADERBOARD_SUCCESS';
export const FETCH_LEADERBOARD_FAILURE = 'FETCH_LEADERBOARD_FAILURE';


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
