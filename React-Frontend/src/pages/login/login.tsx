/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link, useNavigate  } from "react-router-dom";
import { useStyles } from "./styles.js";
import { useSelector, useDispatch } from "react-redux";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import google from "../../assets/images/google.jpg";
import { useFormik } from "formik";
import { useAuthAction } from "../../states/useActions/useAuthAction";
import { RootState } from "../../states/reducers/index";
import { AuthActionTypes } from "../../states/index";
import { loginState } from "../../validators/value/index";
import { loginValidationSchema } from "../../validators/schema/loginSchema";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate ();
  const dispatch = useDispatch();
  const { loginUser } = useAuthAction();
  const { error, isLoading: loading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    return () => {
      dispatch({
        type: AuthActionTypes.AuthActionTypes.CLEAR,
      });
    };
  }, []);

  const formik = useFormik({
    initialValues: loginState,
    validationSchema: loginValidationSchema,
    onSubmit: ({ email, password }) => {
      loginUser({ username: email, password }, navigate);
    },
  });

  const googleLogin = async () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };

  return (
    <Container className={classes.container}>
      <Grid container justifyContent="center">
        <Grid item xs={8} sm={6} md={4}>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <h1 className={classes.text}>Login</h1>
            <TextField
              variant="outlined"
              label="Email"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              className={classes.textField}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant="outlined"
              type="password"
              label="Password"
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
              className={classes.textField}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <div className={classes.resetOrRegisLinkContainer}>
              <Link style={{ textDecoration: "none" }} to="/register">
                <Typography className={classes.regisOrResetLink}>
                  Don't have an account?
                </Typography>
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                to="/reset-password/enter-email"
              >
                <Typography className={classes.regisOrResetLink}>
                  Forget Password?
                </Typography>
              </Link>
            </div>
            <Button
              className={classes.button}
              size="large"
              type="submit"
              variant="contained"
              disabled={loading ? true : false}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <Button
              className={classes.googleBtn}
              size="large"
              variant="contained"
              onClick={googleLogin}
              disabled={loading ? true : false}
            >
              <img
                src={google}
                alt="google"
                width="25"
                height="25"
                style={{ marginRight: "10px" }}
              />
              {loading ? "Loading..." : "Google login"}
            </Button>
          </form>
        </Grid>
        {error && (
          <Snackbar
            open={error !== ""}
            autoHideDuration={6000}
            onClose={() =>
              dispatch({
                type: AuthActionTypes.AuthActionTypes.CLEAR,
              })
            }
          >
            <Alert
              onClose={() =>
                dispatch({
                  type: AuthActionTypes.AuthActionTypes.CLEAR,
                })
              }
              severity="error"
            >
              {error}
            </Alert>
          </Snackbar>
        )}
      </Grid>
    </Container>
  );
};

export default Login;
