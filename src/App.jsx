import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PrivateRoutes from "./routes/PrivateRoutes";

// Auth pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Dashboard pages
 
import GeneralDashboard from "./pages/Dashboard/GeneralDashboard";
import VehicleList from "./pages/vehicles/VehicleList";
import VehicleDetails from "./pages/vehicles/VehicleDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserManagement from "./pages/userManagement/UserManagement";
import TripLog from "./pages/Trips/TripLog";
import DriverDetails from "./pages/userManagement/DriverDetails";
import Maintenance from "./pages/vehicles/Maintenance";
import About from "./pages/Dashboard/About";
import Contact from "./pages/Dashboard/Contact";

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<GeneralDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

      {/* Protected Routes inside MainLayout */}
      <Route
        element={
          <PrivateRoutes>
            <MainLayout />
          </PrivateRoutes>
        }
      >
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/vehicleList" element={<VehicleList />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/triplog" element={<TripLog />} />
        <Route path="/users/:id" element={<DriverDetails />} />
        <Route path="/vehicles/:id/maintenance" element={< Maintenance />} />
      </Route>
    </Routes>
  );
}
