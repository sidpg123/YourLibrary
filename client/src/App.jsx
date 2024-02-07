import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import jwt from "jsonwebtoken";
import JWT_SECRET from './config';  // Adjust the path based on your project structure

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import LibrDashboard from "./pages/LibrDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const role = decodedToken.role;

        if (role === 'user' && location.pathname === '/') {
          Navigate('/userdashboard', { replace: true });
        } else if (role === 'librarian' && location.pathname === '/') {
          Navigate('/librarianDashboard', { replace: true });
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle the error, e.g., log it or redirect to a login page
      }
    }
  }, [location.pathname]);

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
