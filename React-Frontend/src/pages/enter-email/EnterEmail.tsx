/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useFormik } from "formik";
import { RootState } from "../../states/reducers/index";
import { PassActionTypes } from "../../states/index";
import { useStyles } from "./styles";
import * as yup from "yup";
import { usePassAction } from "../../states/useActions/usePassAction";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EnterEmail: React.FC = () => {
  const classes = useStyles();
  const { error, success, isLoading } = useSelector(
    (state: RootState) => state.pass
  );
  const { enterEmail } = usePassAction();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is Required"),
    }),
    onSubmit: ({ email }) => {
      enterEmail({ email });
    },
  });

  const handleClose = () => {
    dispatch({
      type: PassActionTypes.PassActionTypes.CLEAR,
    });
  };

  return (
    <Container className={classes.container}>
      <Grid container justifyContent="center">
        <Grid item xs={8} sm={6} md={4}>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <h1 className={classes.text}>Send Email</h1>
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
            <Link style={{ textDecoration: "none" }} to="/login">
              <Typography className={classes.login}>Login?</Typography>
            </Link>
            <Button
              className={classes.button}
              size="large"
              type="submit"
              variant="contained"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Loading..." : "Send"}
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
