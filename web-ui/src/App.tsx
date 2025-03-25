import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import HomePage from "./pages/Home/home";
import PatientRegistration from "./pages/PatientRegistration";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route index path="/" element={<HomePage />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/patient-registration" element={<PatientRegistration />} />
        </Route>

        {/* Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
