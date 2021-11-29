import * as http from "../../http-request";
import { Dispatch } from "redux";
import { PassAction } from "../actions/pass";
import { PassActionTypes } from "../action-types/pass";

export const enterEmail = (value: { email: string }) => {
  return async (dispatch: Dispatch<PassAction>): Promise<void> => {
    dispatch({
      type: PassActionTypes.LOADING,
    });
    try {
      const { data } = await http.enterEmail(value);
      dispatch({
        type: PassActionTypes.SUCCESS,
        payload: data.message,
      });
      setTimeout(() => {
        dispatch({
          type: PassActionTypes.CLEAR,
        });
      }, 7000);
    } catch (error) {
      if (error.response.data && error.response.data.message) {
        dispatch({
          type: PassActionTypes.ERROR,
          payload: error.response.data.message,
        });
      } else {
        dispatch({
          type: PassActionTypes.ERROR,
          payload: "Something went wrong",
        });
      }
      // dispatch({
      //   type: PassActionTypes.ERROR,
      //   payload: "Something went wrong, Could not send reset-password-link to your email",
      // });
    }
  };
};

export const enterNewPassword = (
  value: { password: string },
  userId: string,
  token: string,
  navigate: any
) => {
  return async (dispatch: Dispatch<PassAction>): Promise<void> => {
    dispatch({
      type: PassActionTypes.LOADING,
    });
    try {
      const { data } = await http.enterNewPassword(value, userId, token);
      dispatch({
        type: PassActionTypes.SUCCESS,
        payload: data.message,
      });
      setTimeout(() => {
        navigate("/login");
        dispatch({
          type: PassActionTypes.CLEAR,
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
