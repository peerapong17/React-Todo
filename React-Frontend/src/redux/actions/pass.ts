import { PassActionTypes } from "../action-types/pass";

interface Loading {
  type: PassActionTypes.LOADING;
}
interface Success {
  type: PassActionTypes.SUCCESS;
  payload: string;
}
interface Error {
  type: PassActionTypes.ERROR;
  payload: string;
}

interface Clear {
  type: PassActionTypes.CLEAR;
}

export type PassAction = Loading | Success | Error | Clear;
