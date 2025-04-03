import { useEffect } from "react";
// import AppHeader from "../../layout/AppHeader";
import AppHome from "../../layout/AppHome";
import { useAppSelector } from "../../redux/hooks/appDispatchHook";
import { useNavigate } from "react-router";

export default function DoctorDashboard() {
  const { isLoggedIn } = useAppSelector((state) => state.signInDoctor);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/drsignin");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <AppHome />

      <div className="mt-16 p-4">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p>Welcome to your dashboard</p>
      </div>
    </div>
  );
}
