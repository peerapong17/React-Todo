import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {TodoActionCreators} from '..'

export const useTodoAction = () => {
  const dispatch = useDispatch();

  return bindActionCreators(TodoActionCreators, dispatch);
};