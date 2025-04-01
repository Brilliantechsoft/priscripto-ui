import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/patient/SignIn";
import SignUp from "./pages/AuthPages/patient/SignUp";
import DrSignIn from "./pages/AuthPages/doctor/DrSignIn";
import DrSignUp from "./pages/AuthPages/doctor/DrSignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import HomePage from "./pages/Home/home";
import DoctorDashboard from "./components/doctor/DoctorDashboard";

export default function App() {
  // const { isLoggedIn } = useAppSelector((state) => state.signInDoctor);
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route index path="/" element={<HomePage />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/blank" element={<Blank />} />
        </Route>

        {/* Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/drsignin" element={<DrSignIn />} />
        <Route path="/drsignup" element={<DrSignUp />} />

        {/* Protected routes */}
        {/* <Route element={<ProtectedRoutes />}>
        </Route> */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

        {/* Protected routes - check auth directly */}
        {/* <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoutes
              isAuthenticated={isLoggedIn}
              redirectTo="/drsignin"
            >
              <DoctorDashboard />
            </ProtectedRoutes>
          }
        /> */}

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
