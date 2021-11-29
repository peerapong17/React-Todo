import { AuthAction } from "../actions/auth";
import { Dispatch } from "redux";
import { AuthActionTypes } from "../action-types/auth";
import * as http from "../../http-request";

export const loginUser = (
  value: { username: string; password: string },
  navigate: any
) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    console.log("object");
    dispatch({
      type: AuthActionTypes.LOADING,
    });
    try {
      const { data } = await http.loginUser(value);
      localStorage.setItem("token", JSON.stringify(data.accessToken));
      dispatch({
        type: AuthActionTypes.LOG_IN_SUCCESS,
      });
      setTimeout(() => {
        navigate("/todo");
      }, 1000);
    } catch (error) {
      if (error?.response && error.response.data) {
        dispatch({
          type: AuthActionTypes.ERROR,
          payload: error.response.data,
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
  navigate: any
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
        navigate("/login");
        dispatch({
          type: AuthActionTypes.REGISTER_SUCCESS,
          payload: "",
        });
      }, 4000);
    } catch (error) {
      console.log(error)
      if (error?.response && error.response.data) {
        dispatch({
          type: AuthActionTypes.ERROR,
          payload: error.response.data,
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

export const fetchProfile = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data } = await http.fetchProfile();

      console.log(data)

      dispatch({
        type: AuthActionTypes.FETCH_PROFILE,
        payload: data.username,
      });
    } catch (error) {
      console.log(error)
      if (error?.response && error.response.data) {
        dispatch({
          type: AuthActionTypes.ERROR,
          payload: error.response.data,
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
  (navigate: any) => async (dispatch: Dispatch<AuthAction>) => {
    await http.logoutUser();
    dispatch({
      type: AuthActionTypes.LOG_OUT,
    });
    localStorage.clear();
    navigate("/login");
  };

// export const enterEmail =
//   (email: string, navigate: any) => async (dispatch: Dispatch<AuthAction>) => {
//     await http.enterEmail();
//   };
