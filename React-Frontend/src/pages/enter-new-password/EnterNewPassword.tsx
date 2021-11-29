/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useFormik } from "formik";
import { RootState } from "../../states/reducers/index";
import { AuthActionTypes } from "../../states/index";
import { useStyles } from "./styles";
import * as yup from "yup";
import { usePassAction } from "../../states/useActions/usePassAction";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EnterEmail: React.FC = () => {
  const classes = useStyles();
  const { enterNewPassword: resetPass } = usePassAction();
  const navigate = useNavigate();
  const { userId, token } = useParams() as { userId: string; token: string };
  const dispatch = useDispatch();
  const { error, isLoading, success } = useSelector(
    (state: RootState) => state.pass
  );
  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: yup.object({
      password: yup
        .string()
        .min(6, "Must be 6 characters or more")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm-Password is required"),
    }),
    onSubmit: ({ password }) => {
      resetPass({ password }, userId, token, navigate);
    },
  });

  const handleClose = () => {
    if (error) {
      dispatch({
        type: AuthActionTypes.AuthActionTypes.ERROR,
        payload: "",
      });
    }
    if (success) {
      dispatch({
        type: AuthActionTypes.AuthActionTypes.LOG_IN_SUCCESS,
        payload: "",
      });
    }
  };

  return (
    <Container className={classes.container}>
      <Grid container justifyContent="center">
        <Grid item xs={8} sm={6} md={4}>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <h1 className={classes.text}>Reset Password</h1>
            <TextField
              variant="outlined"
              label="Password"
              value={formik.values.password}
              name="password"
              type="password"
              onChange={formik.handleChange}
              className={classes.textField}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              variant="outlined"
              label="Confirm Your Password"
              value={formik.values.confirmPassword}
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              className={classes.textField}
              error={
                formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Button
              className={classes.button}
              size="large"
              type="submit"
              variant="contained"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Loading..." : "OK"}
            </Button>
          </form>
        </Grid>
        {error && (
          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              {error}
            </Alert>
          </Snackbar>
        )}
        {success && (
          <Snackbar
            open={!!success}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              {success}
            </Alert>
          </Snackbar>
        )}
      </Grid>
    </Container>
  );
};

export default EnterEmail;
