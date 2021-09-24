import { AuthActionTypes } from "../action-types/auth";
import { AuthAction } from "../actions/auth";
import { AuthState } from "../models/auth";

const initialState: AuthState = {
  authenticated: localStorage.getItem("userData") ? true : false,
  isLoading: false,
  success: "",
  error: "",
};

export const auth = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOG_IN:
      return {
        error: "",
        success: "",
        isLoading: true,
        authenticated: false,
      };
    case AuthActionTypes.LOG_IN_SUCCESS:
      return {
        error: "",
        success: "",
        isLoading: false,
        authenticated: true,
      };

    case AuthActionTypes.REGISTER:
      return {
        success: "",
        isLoading: true,
        error: "",
        authenticated: false,
      };

    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        success: action.payload,
        isLoading: false,
        error: "",
        authenticated: false,
      };

    case AuthActionTypes.LOG_OUT:
      return {
        success: "",
        isLoading: false,
        error: "",
        authenticated: false,
      };

    case AuthActionTypes.ERROR:
      return {
        success: "",
        isLoading: false,
        error: action.payload,
        authenticated: false,
      };

    default:
      return state;
  }
};
