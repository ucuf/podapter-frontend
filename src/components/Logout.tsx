import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const { setAuth } = useAuth();
  setAuth({});
  return <Navigate to="/signin" replace />;
}
