import { AuthActionTypes } from "../action-types/auth";

interface Login {
  type: AuthActionTypes.LOG_IN;
}
interface LoginSuccess {
  type: AuthActionTypes.LOG_IN_SUCCESS;
}
interface Register {
  type: AuthActionTypes.REGISTER;
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

export type AuthAction =
  | Login
  | LoginSuccess
  | Register
  | RegisterSuccess
  | Logout
  | Error;
