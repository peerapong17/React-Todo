import { TodoActionTypes } from "../action-types/todo";
import { Todo, UserData } from "../models/todo";

interface FetchData {
  type: TodoActionTypes.FETCH_DATA;
}
interface FetchDataSuccess {
  type: TodoActionTypes.FETCH_DATA_SUCCESS;
  payload: UserData;
}
interface FetchDataError {
  type: TodoActionTypes.ERROR;
  payload: string;
}
interface CreateTodo {
  type: TodoActionTypes.CREATE_TODO;
  payload: Todo;
}
interface UpdateTodo {
  type: TodoActionTypes.UPDATE_TODO;
  id: string;
  payload: Todo;
}
interface DeleteTodo {
  type: TodoActionTypes.DELETE_TODO;
  payload: string;
}

export type TodoAction =
  | FetchData
  | FetchDataSuccess
  | FetchDataError
  | CreateTodo
  | UpdateTodo
  | DeleteTodo;
