import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { PassActionCreators } from "..";

export const usePassAction = () => {
  const dispatch = useDispatch();

  return bindActionCreators(PassActionCreators, dispatch);
};
