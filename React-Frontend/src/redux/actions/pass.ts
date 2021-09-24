import { PassActionTypes } from "../action-types/pass";

interface EnterEmail {
  type: PassActionTypes.ENTER_EMAIL;
}
interface EnterEmailSuccess {
  type: PassActionTypes.SUCCESS;
  payload: string;
}
interface ResetPassword {
  type: PassActionTypes.RESET_PASSWORD;
}
interface ResetPasswordError {
  type: PassActionTypes.ERROR;
  payload: string;
}

export type PassAction =
  | EnterEmail
  | EnterEmailSuccess
  | ResetPassword
  | ResetPasswordError;
