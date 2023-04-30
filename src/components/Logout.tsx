import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

export default function Logout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("refreshToken");
    setAuth({});
    // navigate("/signin", { replace: true });
  }, [navigate, setAuth]);

  return <Navigate to="/signin" replace />;
}
