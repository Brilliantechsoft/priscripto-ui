import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Footer from "./components/footer/Footer";
import AppHome from "./layout/AppHome";
import { ProtectedRoute } from "./layout/ProtectedRoute";

export default function App() {

  return (
    <Router>
      {/* <AppHome/> */}
      <ScrollToTop />
      
      <Routes>
     
      <Route index path="/" element={<HomePage />} />
      

        <Route element={<AppLayout />}>

        <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />

           <Route path="/doctor-profile" element={<UserProfiles />} /> 
           <Route path="/blank" element={<Blank />} />
        </Route>

        {/* Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/drsignin" element={<DrSignIn />} />
        <Route path="/drsignup" element={<DrSignUp />} />
        <Route path="/patientsignin" element={<PatientSignIn />} /> 
        <Route path="/patientsignup" element={<PatientSignUp />} />

        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-appointment" element={<DoctorAppointment />} />
        <Route path= "/doctor-appointment-request" element= {<DoctorAppointmentRequest />} />

           {/* Doctor booking */}
        <Route path="/video-consult" element={<Banner />} />
        <Route path="/specialization" element={<SpecialityMenu />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/doctors/appointment/:docId" element={<Appointments  />} />
        <Route path="/appointment/:doctorId/:patientId/:timeSlotId" element={<AppointmentForm />} />
        


        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
       
      </Routes>
      <Footer/>
    </Router>
  );
}
