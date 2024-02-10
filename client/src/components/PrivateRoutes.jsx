import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes({ requiredRole }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          console.log("Token is "+token);
          const response = await axios.get("http://localhost:3000/api/v1/user/me", {
            headers: {
              authorization: token
            }
          });

          console.log("inside the privateroutes");
          console.log(response);
          console.log("role of user is " + response.data.role);
          console.log("required role is "+ requiredRole);
          console.log(response.data.role === requiredRole);

          if (response.data.role === requiredRole) {
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
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, [token, requiredRole]);

  console.log("Is this authenticate: "+authenticated);

  if (loading) {
    // Render a loading indicator or some other UI to indicate that authentication is in progress
    return <p>Loading...</p>;
  }

  if (authenticated) {
    console.log("This is authenticated and moved to the next page");
    return <Outlet />;
  } else {
    console.log("This is not authenticated and moved to the root route");
    return <Navigate to="/signin" />;
  }
}
