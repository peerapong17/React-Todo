import {
  Button,
  Card,
  Checkbox,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStyles } from "./styles";
import { useTodoAction } from "../../states/useActions/useTodoAction";
import moment from 'moment'

const TodoList: React.FC<{ task: string; id: string; isCompleted: boolean, createdAt:string }> =
  ({ task, id, isCompleted, createdAt }) => {
    const classes = useStyles();
    const { deleteTodo, updateTodo } = useTodoAction();
    const [todo, setTodo] = React.useState<{
      task: string;
      isCompleted: boolean;
    }>({
      task,
      isCompleted,
    });
    const [isEditting, setIsEditting] = React.useState<boolean>(false);

    const onEdit = () => {
      updateTodo(id, { task: todo.task, isCompleted: todo.isCompleted });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTodo((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    };

    const onToggle = () => {
      updateTodo(id, { task: todo.task, isCompleted: !todo.isCompleted });
      setTodo((prev) => {
        return {
          ...prev,
          isCompleted: !todo.isCompleted,
        };
      });
    };

    return (
      <React.Fragment>
        <Card className={classes.card}>
          <Checkbox checked={todo.isCompleted} onChange={onToggle} />
          {isEditting ? (
            <TextField
              name="task"
              value={todo.task}
              variant="standard"
              onChange={onChange}
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.resize,
                },
              }}
              autoFocus
            />
          ) : (
            <div className={classes.task}>
              <Typography variant="h5">{task}</Typography>
              <Typography variant="caption">{moment(createdAt).fromNow()}</Typography>
            </div>
          )}
          {isEditting && (
            <div className={classes.btnContainer}>
              <Button
                style={{ marginRight: "4px", backgroundColor: "#99ffb4" }}
                variant="contained"
                onClick={() => {
                  setIsEditting(!isEditting);
                  onEdit();
                }}
              >
                <CheckIcon />
              </Button>
              <Button
                onClick={() => {
                  setIsEditting(!isEditting);
                  setTodo({ task, isCompleted });
                }}
                variant="contained"
                color="secondary"
              >
                <CloseIcon />
              </Button>
            </div>
          )}

          {!isEditting && (
            <div className={classes.btnContainer}>
              <Button
                style={{ marginRight: "4px" }}
                variant="contained"
                color="primary"
                onClick={() => setIsEditting(!isEditting)}
              >
                <EditIcon />
              </Button>
              <Button
                onClick={() => deleteTodo(id)}
                variant="contained"
                color="secondary"
              >
                <DeleteIcon />
              </Button>
            </div>
          )}
        </Card>
      </React.Fragment>
    );
  };

export default TodoList;
