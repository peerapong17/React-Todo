import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {AuthActionCreators} from '..'

export const useAuthAction = () => {
  const dispatch = useDispatch();

  return bindActionCreators(AuthActionCreators, dispatch);
};