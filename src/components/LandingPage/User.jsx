import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';
import { useNavigate } from 'react-router-dom';

function User({user,setUser}) {
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("jwt");

    // Check if the JWT token is available in local storage
    if (token) {

      // Fetch user data with image from the backend
      const url = "https://eazy-bazaar-ecommerce-app.onrender.com/api/v1/profile"
      const config =  {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };

      axios.get(url, config)
        .then(response => {
          // The data is in the response.data.user object
          setUser(response.data.user);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []) // Add user as a dependency to prevent unnecessary re-fetching


  const handleLogout = () => {
      // Clear the JWT token from localStorage
    localStorage.removeItem('jwt');
    // Reset the user state
    setUser(null)
    // navigate to homepage
    navigate('/');
  };

  return (
    <div className="wrapper" id="user-page">
      <div className="logo">
        <img src={user.avatar} alt="Profile" />
      </div>
      <div className="text-center mt-4 name">
        Your Account
      </div>
      <div className="user-details-container p-3 mt-3">
        <div className="user-detail">
          <span className="user-label">Name:</span>
          <span>{user.username}</span>
        </div>
        <div className="user-detail">
          <span className="user-label">Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="user-detail">
          <span className="user-label">Phone:</span>
          <span>{user.contact_info}</span>
        </div>
        {/* Add more user details as needed */}
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default User;
