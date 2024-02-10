import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes({ role }) {
  const [authenticated, setAuthenticated] = useState(false);
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            authorization: token
          }
        });
        console.log("inside the privateroutes")
        console.log(response);
        console.log(role);
        console.log(response.data.role == role);
        if (response.data.role == role) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);  //Facing error
      }
    };
    console.log(token)
    if (token) {
      fetchData();
    } else {
      // Handle the case where there is no token (user is not authenticated)
      setAuthenticated(false);
    }
  }, [token, role]);

  return authenticated ? <Outlet /> : <Navigate to="/dashboard"/>;
}
