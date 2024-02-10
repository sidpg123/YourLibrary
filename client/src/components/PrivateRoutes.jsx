import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes({ role }) {
  const [authenticated, setAuthenticated] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get("http://localhost:3000/api/v1/user/me", {
            headers: {
              authorization: token
            }
          });

          console.log("inside the privateroutes");
          console.log(response);
          console.log(response.data.role);
          console.log(role);
          console.log(response.data.role === role)

          if (response.data.role === role) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        } else {
          // Handle the case where there is no token (user is not authenticated)
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);

        // Handle error more gracefully (e.g., redirect to an error page or show a message)
        setAuthenticated(false);
      }
    };

    fetchData();
  }, [token, role]);
  
  console.log(authenticated)
  if(authenticated) {
    <Outlet />
  } else {
    <Navigate to="/" />
  }
}
