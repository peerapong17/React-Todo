import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  authenticated: boolean;
}> = ({ authenticated, component, path }) => {
  return authenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};
export default PrivateRoute;
