import { ReactNode } from "react";
import { useAppSelector } from "../hooks/appDispatchHook";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, user } = useAppSelector((state) => state.signInDoctor);
  const location = useLocation();

  // if (!isLoggedIn) return <Navigate to="/" />;
  // return <>{children}</>;
  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, user } = useAppSelector((state) => state.signInDoctor);
  const location = useLocation();

  if (isLoggedIn && user?.role === "DOCTOR") {
    return (
      <Navigate to="/doctor-dashboard" state={{ from: location }} replace />
    );
  }
  return <>{children}</>;
};
