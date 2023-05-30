import React, { useState } from "react";
import { Button, Box, Modal, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Settings } from "@mui/icons-material";

const ChatContainer = styled("div")({
  // Light
  //   background: "linear-gradient(239.26deg, rgb(221, 238, 237) 63.17%, rgb(253, 241, 224) 94.92%)",
  //Dark
  background:
    "linear-gradient(239.26deg, rgb(0, 0, 0) 50%, rgb(51, 51, 51) 94.92%)",
  // Sunset
  //   background:
  //     "linear-gradient(239.26deg, rgba(246, 95, 0, 0.3) 50%, rgba(0, 0, 150, 0.3) 94.92%)",
  // countryside
  //   background:
  //     "linear-gradient(239.26deg, rgba(0, 225, 12, 0.3) 20%, rgba(255, 252, 0, 0.3) 94.92%)",
  //   rgba(246, 95, 0, 0.8)
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "left",
});

const MessageBubble = styled(Box)({
  // Rest
  //   background: "#FFF",
  //Dark
  background: "rgba(62, 31, 47, 0.8)",
  color: "rgba(255,255,255,0.9)",
  padding: "20px",
  borderRadius: "20px",
  margin: "10px 0",
  lineHeight: "25px",
  width: "fit-content",
  maxWidth: "250px",
});

const TopRightIcon = styled("div")({
  position: "fixed",
  top: "10px",
  right: "10px",
  zIndex: "9999",
  cursor: "pointer",
});

const ModalContent = styled(Box)({
  background: "rgba(255, 255, 255, 0.5)",
  padding: "50px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  outline: "none",
});

const Chat = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("white");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleChangeTheme = () => {
    // Code for changing the theme
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleColorModalOpen = () => {
    setColorModalOpen(true);
  };

  const handleColorModalClose = () => {
    setColorModalOpen(false);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setColorModalOpen(false);
  };

  return (
    <Box>
      <ChatContainer sx={{ paddingLeft: { xs: "30px", md: "450px" } }}>
        <TopRightIcon onClick={openModal}>
          <Settings />
        </TopRightIcon>
        <h1>Welcome, {username}!</h1>
        <MessageBubble>
          <p>Hi there! 👋</p>
        </MessageBubble>
        <MessageBubble>
          <p>Im Wysa- an AI chatbot built by therapists</p>
        </MessageBubble>
        <MessageBubble>
          <p>
            I'm here to understand your concerns and connect you with the best
            resources available to support you
          </p>
        </MessageBubble>
        <MessageBubble sx={{ borderTopLeftRadius: "0px" }}>
          <p>Can I help?</p>
        </MessageBubble>
      </ChatContainer>
      <Modal
        open={modalOpen}
        onClose={closeModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <ModalContent>
          <Typography variant="h5" fontWeight="bold">
            Settings
          </Typography>
          <Button
            sx={{ margin: "20px" }}
            variant="contained"
            color="primary"
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleColorModalOpen}
          >
            Change Theme
          </Button>
        </ModalContent>
      </Modal>
      <Modal
        open={colorModalOpen}
        onClose={handleColorModalClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <ModalContent>
          <Typography variant="h6">Select Color</Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "white",
              color: "black",
              margin: "10px",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.5)" },
            }}
            onClick={() => handleColorSelect("white")}
          >
            White
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "black",
              margin: "10px",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
            }}
            onClick={() => handleColorSelect("black")}
          >
            Black
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "orange",
              margin: "10px",
              "&:hover": { backgroundColor: "rgba(255,165,0,0.5)" },
            }}
            onClick={() => handleColorSelect("orange")}
          >
            Orange
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "green",
              margin: "10px",
              "&:hover": { backgroundColor: "rgba(0,127,0,0.5)" },
            }}
            onClick={() => handleColorSelect("green")}
          >
            Green
          </Button>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Chat;
