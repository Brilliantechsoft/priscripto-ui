import { ReactNode } from "react";
import { useAppSelector } from "../hooks/appDispatchHook";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
  role?: "ADMIN" | "DOCTOR" | "PATIENT"; // Specify which role can access this route
};

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isLoggedIn, user } = useAppSelector((state) => state.signInDoctor);
  const location = useLocation();

  if (!isLoggedIn) {
    // Not logged in - redirect to home
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, user } = useAppSelector((state) => state.signInDoctor);
  const role = useAppSelector((state) => state.signInDoctor.user?.role || null);
  const location = useLocation();

  // Redirecting to dashboard based on role
  if (isLoggedIn) {
    const redirectPath =
      role === "ADMIN"
        ? "/dashboard"
        : role === "DOCTOR"
        ? "/doctor-dashboard"
        : role === "PATIENT"
        ? "/patient-dashboard"
        : "/"; // will remain on home if role is null or invalid
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// import { ReactNode } from "react";
// import { useAppSelector } from "../hooks/appDispatchHook";
// import { Navigate, useLocation } from "react-router-dom";

// export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
//   const { isLoggedIn, user } = useAppSelector((state) => state.signInDoctor);
//   const location = useLocation();

//   // if (!isLoggedIn) return <Navigate to="/" />;
//   // return <>{children}</>;
//   if (!isLoggedIn) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }
//   return <>{children}</>;
// };

// export const GuestRoute = ({ children }: { children: ReactNode }) => {
//   const { isLoggedIn, user } = useAppSelector((state) => state.signInDoctor);
//   const location = useLocation();

//   if (isLoggedIn && user?.role === "DOCTOR") {
//     return (
//       <Navigate to="/doctor-dashboard" state={{ from: location }} replace />
//     );
//   }
//   return <>{children}</>;
// };
