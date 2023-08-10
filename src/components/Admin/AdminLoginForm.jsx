// AdminLoginForm.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

const AdminLoginForm = ({ handleAdminLogin, isAdminLoggedIn,adminData,setAdminData,setErrors }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

const handleLogin = () => {
  const existingAdminUserData = {
    username,
    password
  };

  fetch("https://eazy-bazaar-ecommerce-app.onrender.com/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user: existingAdminUserData }),
  })
    .then((r) => r.json())
    .then((data) => {
      // Save the token to localStorage for future access
      localStorage.setItem("jwt", data.jwt);
      // Save the admin data to localStorage
      localStorage.setItem("adminData", JSON.stringify(data.user));
      // Set the adminData state
      setAdminData(data.user);

      if (data.user.is_admin) {
        handleAdminLogin();
      }
    })
    .catch((error) => {
      // Handle error if needed
      console.error("Error:", error);
      setErrors(error.message);
    });
};

  const handleLogout = () => {
    // Clear the JWT token from localStorage
    localStorage.removeItem('jwt');
    // Reset the user state
    setAdminData(null)
    // After logout, redirect the user to the login page
    navigate('/login');
  };

  useEffect(() => {
    // handleLogin()
    if (isAdminLoggedIn) {
      navigate("/admin/dashboard", { replace: true });
      const jwtToken = localStorage.getItem('jwt');
      if (jwtToken) {
        try {
          const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));
          const expirationTime = decodedToken.exp * 1000; // Converting expiration time to milliseconds
          if (expirationTime < Date.now()) {
            // Token is expired, perform logout action
            handleLogout();
          } else {
            // Token is still valid, set the user state
            // Note: You might want to store more user information in the token and extract it here
            // setAdminData({ username: decodedToken.username });
            console.log(decodedToken)
          }
        } catch (error) {
          console.error('Error decoding JWT token:', error);
          // Handle the error as needed, such as logging out the user
          handleLogout();
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  } 
},[isAdminLoggedIn]);

  return (

    <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            maxWidth:550,
            width: '100%',
            mx: "auto", // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            background: 'none'
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>ADMIN LOGIN</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              onChange={(e) => setUsername(e.target.value)}
              name="email"
              type="email"
              placeholder="johndoe@email.com"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              placeholder="password"
            />
          </FormControl>

          <Button onClick={handleLogin} sx={{ mt: 1 /* margin top */ }}>Log in</Button>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
};

export default AdminLoginForm;
