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
  | Logout
  | Error
  | Clear;
