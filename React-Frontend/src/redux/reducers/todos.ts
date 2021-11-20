import { TodoActionTypes } from "../action-types/todo";
import { StateTodos, UserData } from "../models/todo";
import { TodoAction } from "../actions/todo";

const initialState: StateTodos = {
  isLoading: false,
  userData: {} as UserData,
  error: "",
};

export const todos = (state = initialState, action: TodoAction): StateTodos => {
  switch (action.type) {
    case TodoActionTypes.LOADING:
      return {
        userData: {} as UserData,
        isLoading: true,
        error: "",
      };
    case TodoActionTypes.FETCH_DATA_SUCCESS:
      return {
        userData: action.payload,
        isLoading: false,
        error: "",
      };

    case TodoActionTypes.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case TodoActionTypes.CREATE_TODO:
      return {
        ...state,
        userData: {
          ...state.userData,
          todos: [...state.userData.todos, action.payload],
        },
      };

    case TodoActionTypes.UPDATE_TODO:
      return {
        ...state,
        userData: {
          ...state.userData,
          todos: state.userData.todos.map((todo) =>
            todo.id === action.id
              ? {
                  ...todo,
                  task: action.payload.task,
                  isCompleted: action.payload.isCompleted,
                }
              : todo
          ),
        },
      };

    case TodoActionTypes.DELETE_TODO:
      return {
        ...state,
        userData: {
          ...state.userData,
          todos: state.userData.todos.filter(
            (todo) => todo.id !== action.payload
          ),
        },
      };

    case TodoActionTypes.CLEAR:
      return {
        ...state,
        isLoading: false,
        error: "",
      };

    default:
      return state;
  }
};
