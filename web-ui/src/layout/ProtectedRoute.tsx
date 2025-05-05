import  { ReactNode } from "react";
import { useAppSelector } from "../hooks/appDispatchHook";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children:  ReactNode  }) => {
  const { isLoggedIn } = useAppSelector((state) => state.signInDoctor);

  if (!isLoggedIn) return <Navigate to="/" />;
  return <>{children}</>;
};


