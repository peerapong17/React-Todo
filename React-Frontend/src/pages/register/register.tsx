import React, { useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles.js";
import { Link, useNavigate  } from "react-router-dom";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { RootState } from "../../states/reducers/index";
import { useAuthAction } from "../../states/useActions/useAuthAction";
import { AuthActionTypes } from "../../states/index";
import { registerState } from "../../validators/value/index";
import { registerValidationSchema } from "../../validators/schema/registerSchema";

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
  const navigate = useNavigate ();

  useEffect(() => {
    return () => {
      dispatch({
        type: AuthActionTypes.AuthActionTypes.CLEAR,
      });
    };
  }, []);

  const formik = useFormik({
    initialValues: registerState,
    validationSchema: registerValidationSchema,
    onSubmit: ({ username, email, password }) => {
      createUser({ username, email, password }, navigate);
    },
  });

  const handleClose = () => {
    dispatch({
      type: AuthActionTypes.AuthActionTypes.CLEAR,
    });
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
