import React, { useState } from 'react';
import './LogIn.css';
import { NavLink, useNavigate } from 'react-router-dom';

function LogIn({onAddUser}) {
  const navigate = useNavigate();
   // State to store login form data
  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
  });

  // Function to handle input changes
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
   const handleSubmit = (e) => {
    e.preventDefault();
    const existingUserData = {
      username: loginData.userName,
      password: loginData.password
    }
    // Sending login data to the server
    // Signing Up new users
    fetch("https://eazy-bazaar-ecommerce-app.onrender.com/api/v1/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({user:existingUserData}),
})
  .then((r) => r.json())
  .then(
    (data) => {
    // save the token to localStorage for future access
    localStorage.setItem("jwt", data.jwt);
    // save the user somewhere (in state!) to log the user in
    // Call the onAddUser function to update user state
    onAddUser(data.user);
    // Navigate to the home page
    navigate('/');
  })
  .catch((error) => {
    // Handle error if needed
    console.error('Error:', error);
  });
  };


  return (
    <div className="wrapper">
      <div className="logo">
        <img src="" alt="" />
      </div>
      <div className="text-center mt-4 name">
      Hi, Welcome Back! 👋
      </div>
      <form className="p-3 mt-3" onChange={handleChange} onSubmit={handleSubmit}>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input type="text" name="userName" id="userName" placeholder="Username" />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input type="password" name="password" id="pwd" placeholder="Password" />
        </div>
        <button className="btn mt-3">Login</button>
      </form>

      {/* Remaining code from the lower part of your component */}
      <div className="container">
        <p id='l-account'>
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
