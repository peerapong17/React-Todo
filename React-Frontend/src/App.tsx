import React from "react";
import "./App.css";
import TodoMain from "./pages/todo/todo";
import EnterEmail from "./pages/enter-email/EnterEmail";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./route/PrivateRoute";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import EnterNewPassword from "./pages/enter-new-password/EnterNewPassword";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/enter-email" element={<EnterEmail />} />
        <Route
          path="/reset-password/enter-new-password/:userId/:token"
          element={<EnterNewPassword />}
        />
        <Route path="/todo" element={<PrivateRoute />}>
          <Route path="/todo" element={<TodoMain />} />
        </Route>
        <Route path="/todo/:accessToken" element={<PrivateRoute />}>
          <Route path="/todo/:accessToken" element={<Navigate to="/todo" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
