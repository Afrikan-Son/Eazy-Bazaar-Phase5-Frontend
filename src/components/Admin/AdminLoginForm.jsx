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

const AdminLoginForm = ({ handleAdminLogin, isAdminLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    // Your login logic here (e.g., validate credentials and call handleAdminLogin if successful)
    // For simplicity, we are using a hardcoded admin login check.
    // Replace this with your actual authentication mechanism.
    if (username === "admin" && password === "password") {
      handleAdminLogin();
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAdminLoggedIn]);

  return (
    // <LoginFormContainer>
    //   <LoginFormCard>
    //     <LoginFormTitle>Admin Login</LoginFormTitle>
    //     <InputField
    //       type="text"
    //       placeholder="Username"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //     <InputField
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <LoginButton onClick={handleLogin}>Login</LoginButton>
    //   </LoginFormCard>
    // </LoginFormContainer>

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
