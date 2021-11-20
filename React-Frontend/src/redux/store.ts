import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// declare global {
//     interface Window {
//       __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
//   }

//   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
