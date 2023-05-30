import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if user is already logged in
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = () => {
    // Perform login validation
    const foundUser = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      setIsLoggedIn(true);
      localStorage.setItem("username", foundUser.username);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleRegister = () => {
    // Perform registration validation
    const isUsernameTaken = registeredUsers.some(
      (user) => user.username === username
    );
    if (isUsernameTaken) {
      alert("Username already taken");
    } else {
      const newUser = { username, password };
      setRegisteredUsers([...registeredUsers, newUser]);
      setUsername("");
      setPassword("");
      alert("User registered successfully");
    }
  };

  if (isLoggedIn) {
    return navigate(`/chat/${username}`);
  }

  return (
    <div>
      <h1>Login Page</h1>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </div>
  );
};

export default LoginPage;
