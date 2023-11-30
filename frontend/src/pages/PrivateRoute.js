// PrivateRoute.js
import React from "react";
import { Navigate, Route } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
