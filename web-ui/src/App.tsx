import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignIn from "./pages/AuthPages/patient/PatientSignIn";
import SignUp from "./pages/AuthPages/patient/PatientSignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import HomePage from "./pages/Home/home";
import DrSignIn from "./pages/AuthPages/doctor/DrSignIn";
import DrSignUp from "./pages/AuthPages/doctor/DrSignUp";
import DoctorDashboard from "./components/doctor/doctor-dashboard/DoctorDashboard";
import DoctorAppointment from "./components/doctor/doctor-appointment/DoctorAppointment";
import DoctorAppointmentRequest from "./components/doctor/doctor-appointment/DoctorAppointmentRequest";
import Banner from "./components/consult/Banner";
import SpecialityMenu from "./components/consult/SpecialityMenu";
import Doctors from "./components/consult/Doctor";
import Appointments from "./components/consult/Appointment";
import AppointmentForm from "./pages/Forms/AppointmentForm";
import PatientSignIn from "./pages/AuthPages/patient/PatientSignIn";
import PatientSignUp from "./pages/AuthPages/patient/PatientSignUp";
import DoctorAvailabilityCard from "./components/doctor/doctor-availability/DoctorAvailabilityCard";
import MyPatientsCard from "./components/doctor/my-patients/MyPatientsCard";

import PatientDashboard from "./components/patient/patient-dashboard/PatientDashboard";
import PatientAppointment from "./components/patient/patient-appointment/PatientAppointment";
import PatientMedicalRecord from "./components/patient/patient-appointment/PatientMedicalRecord";
import Footer from "./components/footer/Footer";
import { ProtectedRoute } from "./layout/ProtectedRoute";
import { GuestRoute } from "./layout/ProtectedRoute";
import AppHome from "./layout/AppHome";
import PatientProfile from "./pages/patient/PatientProfile";
import DoctorAppointmentDetails from "./components/doctor/doctor-appointment/DoctorAppointmentDetails";

function AppContent() {
  const location = useLocation();

  const showFooterRoutes = [
    "/",
    "/video-consult",
    "/specialization",
    "/doctors/:speciality",
  ];

  const showFooter =
    showFooterRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/doctors");

  const showAppHomeRoutes = ["/", "/video-consult", "/specialization"];
  const showAppHome =
    showAppHomeRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/doctors") ||
    location.pathname.startsWith("/appointment");

  return (
    <>
      <ScrollToTop />
      {showAppHome && <AppHome />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/video-consult" element={<Banner />} />
        <Route path="/specialization" element={<SpecialityMenu />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/doctors/appointment/:docId" element={<Appointments />} />
        <Route
          path="/appointment/:doctorId/:patientId/:timeSlotId"
          element={<AppointmentForm />}
        />

        {/* Auth Routes - only for guests */}
        <Route
          path="/signin"
          element={
            <GuestRoute>
              <SignIn />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
        <Route
          path="/drsignin"
          element={
            <GuestRoute>
              <DrSignIn />
            </GuestRoute>
          }
        />
        <Route
          path="/drsignup"
          element={
            <GuestRoute>
              <DrSignUp />
            </GuestRoute>
          }
        />
        <Route
          path="/patientsignin"
          element={
            <GuestRoute>
              <PatientSignIn />
            </GuestRoute>
          }
        />
        <Route
          path="/patientsignup"
          element={
            <GuestRoute>
              <PatientSignUp />
            </GuestRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="ADMIN">
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Protected Doctor Routes */}
        <Route element={<AppLayout />}>
          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute role="DOCTOR">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-appointment"
            element={
              <ProtectedRoute role="DOCTOR">
                <DoctorAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-appointment-request"
            element={
              <ProtectedRoute role="DOCTOR">
                <DoctorAppointmentRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-available-timing"
            element={
              <ProtectedRoute role="DOCTOR">
                <DoctorAvailabilityCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-patients"
            element={
              <ProtectedRoute role="DOCTOR">
                <MyPatientsCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-profile"
            element={
              <ProtectedRoute role="DOCTOR">
                <UserProfiles />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Protected Patient Routes */}
        <Route element={<AppLayout />}>
          <Route
            path="/patient-dashboard"
            element={
              <ProtectedRoute role="PATIENT">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient-appointment"
            element={
              <ProtectedRoute role="PATIENT">
                <PatientAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient-records"
            element={
              <ProtectedRoute role="PATIENT">
                <PatientMedicalRecord />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient-profile"
            element={
              <ProtectedRoute role="PATIENT">
                <PatientProfile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Common Routes */}
        <Route element={<AppLayout />}>
          <Route path="/blank" element={<Blank />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
