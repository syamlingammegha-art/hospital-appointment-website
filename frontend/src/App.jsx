import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";
import PatientDashboard from "./pages/PatientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Appointments from "./pages/Appointments";
import TestReports from "./pages/TestReports";
import MedicalRecords from "./pages/MedicalRecords";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import DoctorDashboard from "./pages/DoctorDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import OPRegistration from "./pages/OPRegistration";
import OPQueue from "./pages/OPQueue";
import AppointmentRequests from "./pages/AppointmentRequests";
import OnlineRequests from "./pages/OnlineRequests";
import Patients from "./pages/Patients";
import DoctorsManagement from "./pages/DoctorsManagement";
import AddDoctor from "./pages/AddDoctor";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorPatients from "./pages/DoctorPatients";
import DoctorSchedule from "./pages/DoctorSchedule";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorSettings from "./pages/DoctorSettings";
import Consultation from "./pages/Consultation";
import PatientHistory from "./pages/PatientHistory";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route
        path="/appointments"
        element={<Appointments />}
      />
      <Route
  path="/test-reports"
  element={<TestReports />}
/>
<Route
  path="/medical-records"
  element={<MedicalRecords />}
/>
<Route path="/profile" element={<Profile />} />
<Route path="/services" element={<Services />} />
<Route
  path="/doctor-dashboard"
  element={<DoctorDashboard />}
/>
<Route path="/staff-dashboard" element={<StaffDashboard />} />
<Route path="/op-registration" element={<OPRegistration />} />
<Route
  path="/op-queue"
  element={<OPQueue />}
/>
<Route
  path="/appointment-requests"
  element={<AppointmentRequests />}
/>
<Route path="/online-requests" element={<OnlineRequests />} />
<Route path="/patients" element={<Patients/>}/>
<Route path="/doctors-management" element={<DoctorsManagement/>}/>
<Route path="/add-doctor" element={<AddDoctor />} />
  <Route path="/doctor-appointments" element={<DoctorAppointments />} />
<Route path="/doctor-patients" element={<DoctorPatients />} />
<Route path="/doctor-schedule" element={<DoctorSchedule />} />
<Route path="/doctor-profile" element={<DoctorProfile />} />
<Route path="/doctor-settings" element={<DoctorSettings />} />
<Route path="/consultation/:id" element={<Consultation />} />
<Route path="/patient-history/:id" element={<PatientHistory />} />
  </Routes>
    
  );
}