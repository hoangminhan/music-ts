import * as React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactElement;
}

export function PrivateRoute(props: PrivateRouteProps) {
  const { children } = props;
  const isLogin = Boolean(localStorage.getItem("accessToken"));
  return isLogin ? children : <Navigate to="/login" replace />;
}
