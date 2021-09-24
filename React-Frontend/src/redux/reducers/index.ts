import { combineReducers } from "redux";
import { todos } from "./todos";
import { auth } from "./auth";
import { pass } from "./password";

const reducers = combineReducers({
  todos,
  auth,
  pass,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
