import {
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGIN_REQUEST
} from "../actions/index";

const initialState = {
    user: null,
    error: null,
    isAuthenticated: false,
    isLoading: false,
};

const adminauthReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADMIN_LOGIN_REQUEST:
        return {
          ...state,
          isLoading: true
        };
  
      case ADMIN_LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          isLoading: false,
          error: null
        };
  
      case ADMIN_LOGIN_FAILURE:
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: action.payload
        };

  
      default:
        return state;
    }
  };
  
  export default adminauthReducer;
  