import { AuthActionTypes } from "../action-types/auth";

interface Loading {
  type: AuthActionTypes.LOADING;
}
interface LoginSuccess {
  type: AuthActionTypes.LOG_IN_SUCCESS;
}
interface RegisterSuccess {
  type: AuthActionTypes.REGISTER_SUCCESS;
  payload: string;
}
interface fetchProfile {
  type: AuthActionTypes.FETCH_PROFILE;
  payload: string;
}
interface Error {
  type: AuthActionTypes.ERROR;
  payload: string;
}
interface Logout {
  type: AuthActionTypes.LOG_OUT;
}
interface Clear {
  type: AuthActionTypes.CLEAR;
}

export type AuthAction =
  | Loading
  | LoginSuccess
  | RegisterSuccess
  | fetchProfile
  | Logout
  | Error
  | Clear;
