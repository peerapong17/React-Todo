import { TodoActionTypes } from "../action-types/todo";
import { Todo } from "../models/todo";

interface Loading {
  type: TodoActionTypes.LOADING;
}
interface FetchDataSuccess {
  type: TodoActionTypes.FETCH_DATA_SUCCESS;
  payload: Todo[];
}

interface CreateTodo {
  type: TodoActionTypes.CREATE_TODO;
  payload: Todo;
}
interface UpdateTodo {
  type: TodoActionTypes.UPDATE_TODO;
  id: string;
  payload: { task: string; isCompleted: boolean };
}
interface DeleteTodo {
  type: TodoActionTypes.DELETE_TODO;
  payload: string;
}

interface Error {
  type: TodoActionTypes.ERROR;
  payload: string;
}

interface Clear {
  type: TodoActionTypes.CLEAR;
  payload: string;
}

export type TodoAction =
  | Loading
  | FetchDataSuccess
  | CreateTodo
  | UpdateTodo
  | DeleteTodo
  | Error
  | Clear;
