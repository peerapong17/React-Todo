import { AuthActionTypes } from "../action-types/auth";
import { AuthAction } from "../actions/auth";
import { AuthState } from "../models/auth";

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  username: "",
  isLoading: false,
  success: "",
  error: "",
};

export const auth = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOADING:
      return {
        error: "",
        success: "",
        username: "",
        isLoading: true,
        isAuthenticated: false,
      };

    case AuthActionTypes.LOG_IN_SUCCESS:
    case AuthActionTypes.LOG_OUT:
    case AuthActionTypes.CLEAR:
      return {
        error: "",
        success: "",
        username: "",
        isLoading: false,
        isAuthenticated: false,
      };

    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        success: action.payload,
        isLoading: false,
        error: "",
        username: "",
        isAuthenticated: false,
      };

    case AuthActionTypes.FETCH_PROFILE:
      return {
        error: "",
        success: "",
        isLoading: false,
        username: action.payload,
        isAuthenticated: true,
      };

    case AuthActionTypes.ERROR:
      return {
        success: "",
        username: "",
        isLoading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
