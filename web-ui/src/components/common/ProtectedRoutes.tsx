import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRoutesProps {
  isAuthenticated: boolean;
  redirectTo: string;
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  isAuthenticated,
  redirectTo,
  children,
}) => {
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default ProtectedRoutes;
