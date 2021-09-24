import * as http from "../../http-request";
import { Dispatch } from "redux";
import { PassAction } from "../actions/pass";
import { PassActionTypes } from "../action-types/pass";

export const enterEmail = (value: { email: string }, history: any) => {
  return async (dispatch: Dispatch<PassAction>): Promise<void> => {
    dispatch({
      type: PassActionTypes.ENTER_EMAIL,
    });
    try {
      const { data } = await http.enterEmail(value);
      console.log(data);
      dispatch({
        type: PassActionTypes.SUCCESS,
        payload: data.message,
      });
      setTimeout(() => {
        dispatch({
          type: PassActionTypes.SUCCESS,
          payload: "",
        });
      }, 7000);
    } catch (error) {
      const { message } = error.response.data;
      if (message) {
        dispatch({
          type: PassActionTypes.ERROR,
          payload: message,
        });
      } else {
        dispatch({
          type: PassActionTypes.ERROR,
          payload: "Something went wrong",
        });
      }
    }
  };
};

export const enterNewPassword = (
  value: { password: string },
  userId: string,
  token: string,
  history: any
) => {
  return async (dispatch: Dispatch<PassAction>): Promise<void> => {
    dispatch({
      type: PassActionTypes.RESET_PASSWORD,
    });
    try {
      const { data } = await http.enterNewPassword(value, userId, token);
      dispatch({
        type: PassActionTypes.SUCCESS,
        payload: data.message,
      });
      setTimeout(() => {
        history.push("/login");
        dispatch({
          type: PassActionTypes.SUCCESS,
          payload: "",
        });
      }, 3000);
    } catch (error) {
      const { message } = error.response.data;
      if (message) {
        dispatch({
          type: PassActionTypes.ERROR,
          payload: message,
        });
      } else {
        dispatch({
          type: PassActionTypes.ERROR,
          payload: "Something went wrong",
        });
      }
    }
  };
};
