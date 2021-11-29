/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
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
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";
import TodoForm from "../../components/todoForm/todoForm";
import { useTodoAction } from "../../states/useActions/useTodoAction";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../states/reducers";
import { useAuthAction } from "../../states/useActions/useAuthAction";
import { useNavigate } from "react-router";
import { Todo } from "../../states/models/todo";
import Alert from "@material-ui/lab/Alert";
import { TodoActionTypes } from "../../states/action-types/todo";
import TodoList from "../../components/todoList/todoList";
import Navbar from "../../components/navbar/Navbar";

const TodoMain: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logoutUser } = useAuthAction();
  const { fetchData } = useTodoAction();
  const [selectedDate, setSelectedDate] = React.useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const { isLoading, todoList, error } = useSelector(
    (state: RootState) => state.todos
  );
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    dispatch({
      type: TodoActionTypes.CLEAR,
    });
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(typeof new Date().toISOString());
    console.log(new Date().toISOString().split("T")[0]);
    console.log(e.target.value);
    console.log(e.target.value === new Date().toISOString().split("T")[0]);
    todoList.map((todo) => {
      console.log(todo.createdAt.split("T")[0]);
      console.log(new Date(todo.createdAt).toDateString());
    });
    setSelectedDate(e.target.value);
  };

  const dataListener = (): Todo[] => {
    if (todoList.length > 0) {
      return [...todoList].filter((todo) => {
        return todo.createdAt.split("T")[0] == selectedDate;
      });
    } else {
      return [] as Todo[];
    }
  };

  return (
    <React.Fragment>
      <Navbar setOpen={setOpen} />
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
            ) : dataListener() && dataListener().length > 0 ? (
              dataListener().map((data, i) => {
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
        </Grid>
      </Container>
      <Dialog open={open}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will be directed to login page
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              logoutUser(navigate);
            }}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Ok
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default TodoMain;
