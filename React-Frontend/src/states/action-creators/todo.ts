import { TodoActionTypes } from "../action-types/todo";
import { Dispatch } from "redux";
import * as http from "../../http-request";
import { TodoAction } from "../actions/todo";

export const fetchData =
  () =>
  async (dispatch: Dispatch<TodoAction>): Promise<void> => {
    dispatch({
      type: TodoActionTypes.LOADING,
    });
    try {
      const { data, status } = await http.fetchData();
      if (status >= 200 && status < 300) {
        console.log(data.todoList)

        dispatch({
          type: TodoActionTypes.FETCH_DATA_SUCCESS,
          payload: data.todoList,
        });
      } else {
        throw new Error("Could not fetch the data");
      }
    } catch (error) {
      dispatch({
        type: TodoActionTypes.ERROR,
        payload: "Could not fetch the data",
      });
    }
  };

export const createTodo =
  (value: { task: string }) => async (dispatch: Dispatch<TodoAction>) => {
    console.log(value)
    try {
      const { data } = await http.createTodo(value);
      console.log(data)
      dispatch({
        type: TodoActionTypes.CREATE_TODO,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: TodoActionTypes.ERROR,
        payload: error.response.message,
      });
    }
  };

export const updateTodo =
  (id: string, value: { task: string; isCompleted: boolean }) =>
  async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({
        type: TodoActionTypes.UPDATE_TODO,
        id: id,
        payload: value,
      });
      await http.updateTodo(id, value);
    } catch (error) {
      dispatch({
        type: TodoActionTypes.ERROR,
        payload: "An error occured",
      });
    }
  };

export const deleteTodo =
  (id: string) => async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({
        type: TodoActionTypes.DELETE_TODO,
        payload: id,
      });
      await http.deleteTodo(id);
    } catch (error) {
      dispatch({
        type: TodoActionTypes.ERROR,
        payload: error.response.message,
      });
    }
  };
