import { TodoActionTypes } from "../action-types/todo";
import { Dispatch } from "redux";
import * as http from "../../http-request";
import { TodoAction } from "../actions/todo";

export const fetchData =
  () =>
  async (dispatch: Dispatch<TodoAction>): Promise<void> => {
    dispatch({
      type: TodoActionTypes.FETCH_DATA,
    });
    try {
      const { data, status } = await http.fetchData();
      if (status >= 200 && status < 300) {
        dispatch({
          type: TodoActionTypes.FETCH_DATA_SUCCESS,
          payload: { ...data },
        });
      } else {
        throw new Error("Could not fetch the data");
      }
      dispatch({
        type: TodoActionTypes.FETCH_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: TodoActionTypes.ERROR,
        payload: error.response.message,
      });
    }
  };

export const createTodo =
  (value: { task: string }) => async (dispatch: Dispatch<TodoAction>) => {
    try {
      const { data } = await http.createTodo(value);
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
      const { data } = await http.updateTodo(id, value);
      console.log(value)
      dispatch({
        type: TodoActionTypes.UPDATE_TODO,
        id: id,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: TodoActionTypes.ERROR,
        payload: error.response.message,
      });
    }
  };

export const deleteTodo =
  (id: string) => async (dispatch: Dispatch<TodoAction>) => {
    try {
      await http.deleteTodo(id);
      dispatch({
        type: TodoActionTypes.DELETE_TODO,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: TodoActionTypes.ERROR,
        payload: error.response.message,
      });
    }
  };
