import React, { useState } from 'react';
import './LogIn.css';
import { NavLink, useNavigate } from 'react-router-dom';

// import logo from '../'

function LogIn({onAddUser}) {
  const navigate = useNavigate();
  const [errors,setErrors] = useState('')
  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    const existingUserData = {
      username: loginData.userName,
      password: loginData.password
    }
    // Signing Up new users
    fetch("https://eazy-bazaar-ecommerce-app.onrender.com/api/v1/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({user:existingUserData}),
})
.then((r) => {
 if (r.ok) {
  return r.json();
 } else {
  return r.json().then(data => {
    setErrors(data.message)
    throw new Error(data.message)
    
  })
 }
})
.then(
  (data) => {
  // save the token to localStorage for future access
  localStorage.setItem("jwt", data.jwt);
  // save the user somewhere (in state!) to log the user in
  onAddUser(data.user);
  console.log(data.user)
  navigate('/');
  })
  .catch((error) => {
  // Handle error if needed
  console.error('Error:', error);
  // setErrors(error.error)
  // console.log(error.error)
})
}
console.log(typeof(errors))
setTimeout(() => {
  if (errors) {
    setErrors('')
  }
},5000)

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
      {errors && 
      <li className="text-center mt-4" style={{color:'red'}}>{errors}</li>}
    </div>
  );
}

export default LogIn;
