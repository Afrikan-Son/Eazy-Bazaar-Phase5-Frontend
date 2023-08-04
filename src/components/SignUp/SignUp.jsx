import React, { useState } from 'react';
import './SignUp.css';
import { NavLink, useNavigate } from 'react-router-dom';

function SignUp({setUser}) {
  
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const newUserData = {
      username: loginData.name,
      email: loginData.email,
      contact_info: loginData.contact,
      password: loginData.password
    }
    e.preventDefault();
    // Signing Up new users
    fetch("https://eazy-bazaar-ecommerce-app.onrender.com/api/v1/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({user:newUserData}),
})
  .then((r) => r.json())
  .then(
    (data) => {
    // save the token to localStorage for future access
    localStorage.setItem("jwt", data.jwt);
    // save the user somewhere (in state!) to log the user in
    setUser(data.user);
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
      Create an account.
      </div>
      <form className="p-3 mt-3" onChange={handleChange} onSubmit={handleSubmit}>
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input type="text" name="name" id="name" placeholder="Username" required />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-envelope"></span>
          <input type="email" name="email" id="email" placeholder="Email" required />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-phone"></span>
          <input type="tel" name="contact" id="contact" placeholder="Phone Number" required />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input type="password" name="password" id="pwd" placeholder="Password" required />
        </div>
        <button className="btn mt-3">Sign Up</button>
      </form>
      <div className="text-center fs-6">
        Already have an account? <NavLink to="/login">Login</NavLink>
      </div>
    </div>
  );
}

export default SignUp;
