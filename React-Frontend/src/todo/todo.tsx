/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";
import TodoForm from "./todoForm/todoForm";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import * as http from "../http-request/todo";
import TodoList from "./todoList/todoList";
import { UserData } from "../redux/models/todo";
import axios from "axios";
import { useTodoAction } from "../redux/useActions/useTodoAction";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { useAuthAction } from "../redux/useActions/useAuthAction";
import { useHistory } from "react-router";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Todo: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { logoutUser } = useAuthAction();
  const { fetchData } = useTodoAction();
  const { isLoading, userData, error } = useSelector(
    (state: RootState) => state.todos
  );
  const [open, setOpen] = React.useState<boolean>(false);
  // const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    fetchData();
    // const fetch = async () => {
    //   console.log("object");
    //   const response = await axios.get<UserData>("http://localhost:4000/todo", {
    //     headers: {
    //       Authorization:
    //         "Bearer " + JSON.parse(localStorage.getItem("userData")!),
    //     },
    //   });

    //   if (response.status >= 200 && response.status < 300) {
    //     setLoading(false);
    //     setUserData({...response.data});
    //   } else {
    //     throw new Error("Error: Could not fetch the data");
    //   }
    // };

    // fetch();
  }, []);

  const handleDateChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // console.log(typeof new Date().toISOString());
    // console.log(new Date().toISOString());
    // console.log(e.target.value);
    // todoList.map((todo) => {
    //   console.log(todo.createdAt);
    //   console.log(new Date(todo.createdAt.seconds).toDateString());
    //   console.log(
    //     new Date(todo.createdAt.seconds).toLocaleString("en-GB", {
    //       timeZone: "UTC",
    //     })
    //   );
    // });
  };

  if (error) {
    return <h3>Error in the API call itself ...</h3>;
  }

  const handleClose = () => {
    console.log("object");
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Todo {userData.username}
          </Typography>
          <Button
            onClick={() => setOpen(true)}
            variant="outlined"
            endIcon={<ExitToAppIcon />}
            color="secondary"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Grid
          container
          justifyContent="center"
          className={classes.gridContainer}
          spacing={6}
        >
          <Grid item xs={7} md={4}>
            <TodoForm />
            {isLoading ? (
              <CircularProgress
                color="secondary"
                className={classes.circular}
              />
            ) : userData.todos && userData.todos.length != 0 ? (
              userData.todos.map((data, i) => {
                return <TodoList key={i} {...data} />;
              })
            ) : (
              <Typography className={classes.noTask} variant="h4">
                No Task To Do...
              </Typography>
            )}
          </Grid>
          <Grid item xs={7} md={4}>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleDateChange(e)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Container>
      {error && (
        <Snackbar
          open={error !== ""}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      <Dialog open={open}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will be directed to login page
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              logoutUser(history);
            }}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Todo;
