import { FETCH_LEADERBOARD_REQUEST, FETCH_LEADERBOARD_SUCCESS, FETCH_LEADERBOARD_FAILURE } from '../actions';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEADERBOARD_REQUEST:
      return { ...state, loading: true };
    case FETCH_LEADERBOARD_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_LEADERBOARD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default leaderboardReducer;
