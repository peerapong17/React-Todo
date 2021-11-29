import { StatePass } from "../models/pass";
import { PassAction } from "../actions/pass";
import { PassActionTypes } from "../action-types/pass";

const initialState: StatePass = {
  isLoading: false,
  success: "",
  error: "",
};

export const pass = (state = initialState, action: PassAction): StatePass => {
  switch (action.type) {
    case PassActionTypes.LOADING:
      return {
        isLoading: true,
        success: "",
        error: "",
      };
    case PassActionTypes.SUCCESS:
      return {
        isLoading: false,
        success: action.payload,
        error: "",
      };

    case PassActionTypes.ERROR:
      return {
        isLoading: false,
        success: "",
        error: action.payload,
      };

    case PassActionTypes.CLEAR:
      return {
        isLoading: false,
        success: "",
        error: "",
      };

    default:
      return state;
  }
};
