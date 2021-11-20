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
    case AuthActionTypes.LOADING:
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

    case AuthActionTypes.CLEAR:
      return {
        ...state,
        success: "",
        isLoading: false,
        error: "",
      };

    default:
      return state;
  }
};
