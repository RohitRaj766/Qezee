import {
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGOUT_FAILURE,
    ADMIN_LOGOUT_SUCCESS,
    CREATE_QUIZ_REQUEST,
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_FAILURE
} from "../actions/index";

const initialState = {
    user: null,
    error: null,
    isAuthenticated: false,
    isLoading: false,
    message:null
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
  
        case ADMIN_LOGOUT_SUCCESS:
          return {
            ...state,
            isAuthenticated: false
          };
    
        case ADMIN_LOGOUT_FAILURE:
          return {
            ...state
          };

          case CREATE_QUIZ_REQUEST:
            return {
              ...state,
              isLoading: true
            };
      
          case CREATE_QUIZ_SUCCESS:
            return {
              ...state,
              message: action.payload,
              isLoading: false,
              error: null
            };
      
          case CREATE_QUIZ_FAILURE:
            return {
              ...state,
              isLoading: false,
              error: action.payload
            };
      default:
        return state;
    }
  };
  
  export default adminauthReducer;
  