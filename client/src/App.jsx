import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
//import jwt from "jsonwebtoken";
//import { JWT_SECRET } from "./config";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import LibrDashboard from "./pages/LibrDashboard";
import UserDashboard from "./pages/UserDashboard";


function App() {
  // const location = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     try {
  //       const decoded = jwt.verify(token, JWT_SECRET);
  //       const role = decoded.role;

  //       if (role === 'user' && location.pathname === '/') {
  //         navigate('/userdashboard', { replace: true });
  //       } else if (role === 'librarian' && location.pathname === '/') {
  //         navigate('/librarianDashboard', { replace: true });
  //       }
  //     } catch (error) {
  //       console.error('Error decoding token:', error);
  //     }
  //   }
  // }, [location.pathname, navigate]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/librarianDashboard" element={<LibrDashboard />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
