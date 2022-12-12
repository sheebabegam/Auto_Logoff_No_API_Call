import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRouter = () => {
  let auth = { token: true };
  let hasToken = JSON.parse(localStorage.getItem("auth"));

  return hasToken !== null ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRouter;
