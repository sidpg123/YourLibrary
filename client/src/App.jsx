import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import LibrDashboard from "./pages/LibrDashboard";
import UserDashboard from "./pages/UserDashboard";
import PrivateRoutes from "./components/PrivateRoutes";


function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          {/* Private routes for users */}
          <Route
            path="/userdashboard"
            element={
              <PrivateRoutes role="user">
                <Route element={<UserDashboard />} />
              </PrivateRoutes>
            }
          />

          {/* Private routes for librarians */}
          <Route
            path="/librarianDashboard"
            element={
              <PrivateRoutes role="librarian">
                <Route  element={<LibrDashboard />} />
              </PrivateRoutes>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
