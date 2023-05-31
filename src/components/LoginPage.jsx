import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  //Browser Local Storage Variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Login check
  const [registeredUsers, setRegisteredUsers] = useState([]);
  //Alerts
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  // New state for profile picture
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = () => {
    // Perform login validation
    const foundUser = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      localStorage.setItem("username", foundUser.username);
      return navigate(`/chat/${username}`);
    } else {
      setShowErrorAlert(true);
    }
  };

  const handleRegister = () => {
    // Perform registration validation
    const isUsernameTaken = registeredUsers.some(
      (user) => user.username === username
    );
    if (isUsernameTaken) {
      setShowErrorAlert(true);
    } else {
      const newUser = { username, password, profilePicture };
      localStorage.setItem("username", username);
      setRegisteredUsers([...registeredUsers, newUser]);
      setUsername("");
      setPassword("");
      setProfilePicture(null);
      setShowSuccessAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        background:
          "linear-gradient(239.26deg, rgb(221, 238, 237) 63.17%, rgb(253, 241, 224) 94.92%)",
      }}
    >
      <Typography variant="h3" sx={{ color: "gray", paddingBottom: "20px" }}>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <label htmlFor="profile-picture-upload" style={{ marginTop: "16px" }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" component="span">
            Upload Profile Picture
          </Typography>
          <Button
            variant="outlined"
            component="span"
            color="primary"
            size="large"
            style={{ marginTop: "8px" }}
          >
            Browse
          </Button>
          {profilePicture && (
            <Typography variant="body2" style={{ marginTop: "8px" }}>
              {profilePicture.name}
            </Typography>
          )}
        </Box>
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePictureChange}
        style={{ display: "none" }}
        id="profile-picture-upload"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        size="large"
        style={{ margin: "16px 0" }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRegister}
        size="large"
      >
        Register
      </Button>
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        message="User registered successfully"
      />
      <Snackbar
        open={showErrorAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        message="Invalid credentials, Kindly Register first."
      />
    </Box>
  );
};

export default LoginPage;
