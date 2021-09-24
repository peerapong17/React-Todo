import React from "react";
import {
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles.js";
import { Link, useHistory } from "react-router-dom";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { registerValidationSchema } from "../yub/schema/registerSchema";
import { registerState } from "../yub/value";
import { RootState } from "../../redux/reducers/index";
import { useAuthAction } from "../../redux/useActions/useAuthAction";
import { AuthActionTypes } from "../../redux/index";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const { error, isLoading, success } = useSelector(
    (state: RootState) => state.auth
  );
  const { createUser } = useAuthAction();
  const classes = useStyles();
  const history = useHistory();
  const formik = useFormik({
    initialValues: registerState,
    validationSchema: registerValidationSchema,
    onSubmit: ({ username, email, password }) => {
      createUser({ username, email, password }, history);
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
            <h1 className={classes.text}>Register</h1>
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Username"
              value={formik.values.username}
              name="username"
              onChange={formik.handleChange}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Email"
              value={formik.values.email}
              name="email"
              type="email"
              onChange={formik.handleChange}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Password"
              value={formik.values.password}
              name="password"
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="ConfirmPassowrd"
              value={formik.values.confirmPassword}
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography className={classes.loginLink}>
                Already have an account?
              </Typography>
            </Link>
            {
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                disabled={isLoading ? true : false}
                className={classes.button}
              >
                {isLoading ? "Loading..." : "Register"}
              </Button>
            }
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

export default Register;
