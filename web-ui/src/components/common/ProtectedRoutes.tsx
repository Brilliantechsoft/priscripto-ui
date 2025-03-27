import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { token } = useSelector((state: RootState) => state.signInDoctor);

  // Optional: Verify token validity here if needed
  //   useEffect(() => {
  //     if (!token) {
  //       // Clear any stale tokens
  //       localStorage.removeItem("doctorToken");
  //     }
  //   }, [token]);

  if (!token) {
    return <Navigate to="/drsignin" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoutes;
