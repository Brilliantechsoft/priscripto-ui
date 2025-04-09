import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/patient/SignIn";
import SignUp from "./pages/AuthPages/patient/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import HomePage from "./pages/Home/home";
import PatientRegistration from "./pages/PatientRegistration";
// import ForgotPasswordForm from "./";
// import ResetPasswordForm from "./components/auth/ResetPasswordForm";
// import CheckYourEmail from "./components/auth/CheckYourEmail";
import ForgotPasswordForm from "./components/auth/patient/Forgetpass";
import ResetPasswordForm from "./components/auth/patient/ResetPasswordForm";
import CheckYourEmail from "./components/auth/patient/CheckYourEmail";
import DrSignIn from "./pages/AuthPages/doctor/DrSignIn";
import DrSignUp from "./pages/AuthPages/doctor/DrSignUp";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import Banner from "./components/consult/Banner";
import SpecialityMenu from "./components/consult/SpecialityMenu";
import Doctors from "./components/consult/Doctor";
import Appointments from "./components/consult/Appointment";


export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route index path="/" element={<HomePage />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/doctor-profile" element={<UserProfiles />} />
          <Route path="/blank" element={<Blank />} />
          <Route
            path="/patient-registration"
            element={<PatientRegistration />}
          />
        </Route>

        {/* Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password/update" element={<ResetPasswordForm />} />
        <Route path="/check-your-email" element={<CheckYourEmail />} />
        <Route path="/drsignin" element={<DrSignIn />} />
        <Route path="/drsignup" element={<DrSignUp />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/video-consult" element={<Banner />} />
        <Route path="/specialization" element={<SpecialityMenu />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/doctors/appointment/:docId" element={<Appointments />} />


        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
