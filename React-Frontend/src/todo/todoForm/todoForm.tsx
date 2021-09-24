import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "./styles";
import { Button, Card, TextField } from "@material-ui/core";
import { useTodoAction } from "../../redux/useActions/useTodoAction";
import { useHistory } from "react-router";

const TodoForm: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { createTodo } = useTodoAction();
  const [task, setTask] = React.useState<string>("");

  const onClick = () => {
    if (task.trim() !== "") {
      createTodo({ task });
      setTask("");
    }
  };

  return (
    <Card className={classes.card}>
      <TextField
        className={classes.textField}
        variant="standard"
        placeholder="Todooo...."
        value={task}
        name="task"
        InputProps={{ disableUnderline: true }}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button
        type="button"
        onClick={onClick}
        variant="contained"
        color="secondary"
      >
        <AddIcon />
      </Button>
    </Card>
  );
};

export default TodoForm;
