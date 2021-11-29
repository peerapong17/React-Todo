import React from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../states/reducers";
import { useAuthAction } from "../states/useActions/useAuthAction";
import { CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { AuthActionTypes } from "../states";

export const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { fetchProfile } = useAuthAction();
  const { accessToken } = useParams() as { accessToken: string };
  const { isAuthenticated, username, error } = useSelector(
    (state: RootState) => state.auth
  );

  console.log("before useEffect");

  React.useEffect(() => {
    dispatch({
      type: AuthActionTypes.AuthActionTypes.LOADING,
    });

    if (accessToken) {
      localStorage.setItem("token", JSON.stringify(accessToken));
    }

    console.log("inside useEffect");

    fetchProfile();
  }, []);

  if (error) return <Navigate to="/login" />;

  if (!username)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    );


  console.log("outside useEffect");

  return isAuthenticated && username ? <Outlet /> : <Navigate to="/login" />;
};
