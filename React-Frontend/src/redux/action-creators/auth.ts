import { AuthAction } from "../actions/auth";
import { Dispatch } from "redux";
import { AuthActionTypes } from "../action-types/auth";
import * as http from "../../http-request";

export const loginUser = (
  value: { username: string; password: string },
  history: any
) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.LOADING,
    });
    try {
      const { data } = await http.loginUser(value);
      localStorage.setItem("userData", JSON.stringify(data.accessToken));
      dispatch({
        type: AuthActionTypes.LOG_IN_SUCCESS,
      });
      setTimeout(() => {
        history.push("/todo");
      }, 1000);
    } catch (error) {
      const { message } = error.response.data;
      if (message) {
        dispatch({
          type: AuthActionTypes.ERROR,
          payload: message,
        });
      } else {
        dispatch({
          type: AuthActionTypes.ERROR,
          payload: "Something went wrong",
        });
      }
    }
  };
};

export const createUser = (
  value: {
    username: string;
    email: string;
    password: string;
  },
  history: any
) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.LOADING,
    });
    try {
      const { data } = await http.createUser(value);
      dispatch({
        type: AuthActionTypes.REGISTER_SUCCESS,
        payload: data.message,
      });
      setTimeout(() => {
        history.push("/login");
        dispatch({
          type: AuthActionTypes.REGISTER_SUCCESS,
          payload: "",
        });
      }, 4000);
    } catch (error) {
      const { message } = error.response.data;
      if (message) {
        dispatch({
          type: AuthActionTypes.ERROR,
          payload: message,
        });
      } else {
        dispatch({
          type: AuthActionTypes.ERROR,
          payload: "Something went wrong",
        });
      }
    }
  };
};

export const logoutUser =
  (history: any) => async (dispatch: Dispatch<AuthAction>) => {
    await http.logoutUser();
    dispatch({
      type: AuthActionTypes.LOG_OUT,
    });
    localStorage.clear();
    history.push("/login");
  };

// export const enterEmail =
//   (email: string, history: any) => async (dispatch: Dispatch<AuthAction>) => {
//     await http.enterEmail();
//   };
