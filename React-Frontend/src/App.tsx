import React from "react";
import "./App.css";
import TodoMain from "./todo/todo";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import PrivateRoute from "./route/privatedRoute";
import EnterEmail from "./auth/enter-email/EnterEmail";
import EnterNewPassword from "./auth/enter-new-password/EnterNewPassword";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";

function App(): JSX.Element {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset-password/enter-email" component={EnterEmail} />
        <Route exact path="/reset-password/enter-new-password/:userId/:token" component={EnterNewPassword} />
        <PrivateRoute
          path="/todo"
          component={TodoMain}
          authenticated={authenticated}
        />
      </Switch>
    </Router>
  );
}

export default App;
