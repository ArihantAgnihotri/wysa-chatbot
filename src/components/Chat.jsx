import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Modal,
  Typography,
  Tooltip,
  TextField,
  IconButton,
  Slider,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { Settings, Send } from "@mui/icons-material";
import MessageBubble from "./MessageBubble";
import { ChromePicker } from "react-color";
const ChatContainer = styled("div")({
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "left",
  paddingRight: "10px",
});

const MessageImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: "20px",
});

const TopRightIcon = styled("div")({
  position: "fixed",
  top: "10px",
  right: "10px",
  zIndex: "9999",
  cursor: "pointer",
  transition: "filter 0.3s ease-in-out",
  "&:hover": {
    filter: "drop-shadow(0 0 8px rgba(0, 0, 255, 0.5))",
  },
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
  const [offsetValue, setOffsetValue] = useState(1);
  const [delayModalOpen, setDelayModalOpen] = useState(false);
  const [theme, setTheme] = useState({
    backgroundColor:
      "linear-gradient(239.26deg, rgb(221, 238, 237) 63.17%, rgb(253, 241, 224) 94.92%)",
    messageBubbleColor: "white",
    textColor: "black",
  });
  const [customThemeModalOpen, setCustomThemeModalOpen] = useState(false);
  const [customTheme, setCustomTheme] = useState({
    backgroundColor1: "",
    backgroundColor2: "",
    messageBubbleColor: "",
    textColor: "",
    gradientPercentage: 50, // Initial gradient percentage
  });

  const handleLogout = () => {
    navigate("/login");
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
  const openDelayModal = () => {
    setDelayModalOpen(true);
  };

  const closeDelayModal = () => {
    setDelayModalOpen(false);
  };
  const handleTheme = ({ backgroundColor, messageBubbleColor, textColor }) => {
    setTheme({
      backgroundColor: backgroundColor,
      messageBubbleColor: messageBubbleColor,
      textColor: textColor,
    });
    setColorModalOpen(false);
  };
  const openCustomThemeModal = () => {
    setCustomThemeModalOpen(true);
  };

  const closeCustomThemeModal = () => {
    setCustomThemeModalOpen(false);
  };

  const handleCustomThemeChange1 = (color) => {
    setCustomTheme((prevTheme) => ({
      ...prevTheme,
      backgroundColor1: color.hex,
    }));
  };
  const handleCustomThemeChange2 = (color) => {
    setCustomTheme((prevTheme) => ({
      ...prevTheme,
      backgroundColor2: color.hex,
    }));
  };

  const handleCustomThemeSliderChange = (e, newValue) => {
    setCustomTheme((prevTheme) => ({
      ...prevTheme,
      gradientPercentage: newValue,
    }));
  };
  const handleCustomThemeSubmit = () => {
    const gradientPercentage = customTheme.gradientPercentage;
    const bc1 = customTheme.backgroundColor1;
    const bc2 = customTheme.backgroundColor2;
    const backgroundColor = `linear-gradient(239.26deg, ${bc1} ${gradientPercentage}%, ${bc2} ${
      100 - gradientPercentage
    }%)`;
    const selectedTheme = {
      backgroundColor,
      messageBubbleColor: "white",
      textColor: "black",
    };
    handleTheme(selectedTheme);
    handleColorModalClose();
  };
  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("chatTheme");
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("chatTheme", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    const savedOffset = localStorage.getItem("offsetValue");
    if (savedOffset) {
      setOffsetValue(parseInt(savedOffset));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("offsetValue", offsetValue.toString());
  }, [offsetValue]);

  return (
    <Box
      sx={{
        height: "105vh",
        display: "flex",
        flexDirection: "column",
        background: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <ChatContainer
        sx={{
          paddingTop: { xs: "20px", md: "30px" },
          paddingLeft: { xs: "40px", md: "450px" },
        }}
      >
        <TopRightIcon onClick={openModal}>
          <Tooltip title="Settings">
            <Settings sx={{ color: "gray" }} />
          </Tooltip>
        </TopRightIcon>
        <MessageBubble
          text={`Hi there, ${
            username.length > 30 ? username.slice(0, 30) + "..." : username
          } 👋`}
          theme={theme}
          offset={offsetValue * 1}
        />

        <MessageBubble
          text=" Im Wysa- an AI chatbot built by therapists"
          theme={theme}
          offset={offsetValue * 2}
        />
        <MessageBubble
          text="I'm here to understand your concerns and connect you with the best
              resources available to support you"
          theme={theme}
          offset={offsetValue * 3}
          imageSrc="https://www.gachi.gay/wjCr0"
        />
        <MessageBubble
          text="Can I help?"
          theme={theme}
          offset={offsetValue * 4}
        />
      </ChatContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          // position: "fixed",
          bottom: "30px",
          left: "20px",
          right: "20px",
          border: "1px solid rgba(0,0,0,0.1)",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "40px",
        }}
      >
        <TextField
          placeholder="Type your message..."
          fullWidth
          variant="standard"
          sx={{ marginRight: "8px", px: "10px" }}
        />
        <IconButton color="primary">
          <Send />
        </IconButton>
      </Box>
      <Modal
        open={modalOpen}
        onClose={closeModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <ModalContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "rgb(50,50,50)" }}
          >
            Settings
          </Typography>
          <Button
            sx={{
              margin: "20px",
              backgroundColor: "rgba(200,0,0,0.7)",
              "&:hover": { backgroundColor: "rgba(200,0,0,0.5)" },
            }}
            variant="contained"
            color="primary"
            onClick={openDelayModal}
          >
            Configure Delay
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleColorModalOpen}
            sx={{
              backgroundColor: "rgba(0, 80, 255, 0.8)",
              "&:hover": { backgroundColor: "rgba(0,80,255,0.5)" },
            }}
          >
            Change Theme
          </Button>
          <Button
            sx={{
              margin: "20px",
              backgroundColor: "rgba(200,0,0,0.7)",
              "&:hover": { backgroundColor: "rgba(200,0,0,0.5)" },
            }}
            variant="contained"
            color="primary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </ModalContent>
      </Modal>
      <Modal
        open={delayModalOpen}
        onClose={closeDelayModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModalContent sx={{ background: "rgba(255,255,255,0.7)" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "rgb(50,50,50)" }}
          >
            Configure Delay
          </Typography>
          <Typography variant="body1" sx={{ color: "rgb(100,100,100)", mt: 2 }}>
            Offset Value: {offsetValue}
          </Typography>
          <Slider
            value={offsetValue}
            onChange={(e, newValue) => setOffsetValue(newValue)}
            min={1}
            max={10}
            step={1}
            marks
            sx={{ mt: 4 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={closeDelayModal}
            sx={{ mt: 4 }}
          >
            Save
          </Button>
        </ModalContent>
      </Modal>

      <Modal
        open={colorModalOpen}
        onClose={handleColorModalClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <ModalContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "rgb(50,50,50)" }}
          >
            Select Color
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "rgba(255,255,255,0.5)",
              color: "black",
              margin: "10px",
              "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
            }}
            onClick={() =>
              handleTheme({
                backgroundColor:
                  "linear-gradient(239.26deg, rgb(221, 238, 237) 63.17%, rgb(253, 241, 224) 94.92%)",
                messageBubbleColor: "white",
                textColor: "black",
              })
            }
          >
            Light
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "rgba(0,0,0,0.5)",
              margin: "10px",
              "&:hover": { backgroundColor: "rgba(0,0,0,1)" },
            }}
            onClick={() =>
              handleTheme({
                backgroundColor:
                  "linear-gradient(239.26deg, rgb(0, 0, 0) 40%, rgb(51, 51, 51) 94.92%)",
                messageBubbleColor: "rgba(62, 31, 47, 0.8)",
                textColor: "rgba(255,255,255,0.9)",
              })
            }
          >
            Dark
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "rgba(255,165,0,0.5)",
              margin: "10px",
              "&:hover": { backgroundColor: "rgba(255,165,0,1)" },
            }}
            onClick={() =>
              handleTheme({
                backgroundColor:
                  "linear-gradient(239.26deg, rgba(246, 95, 0, 0.3) 50%, rgba(0, 80, 150, 0.3) 94.92%)",
                messageBubbleColor: "white",
                textColor: "black",
              })
            }
          >
            Sunset
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "rgba(0,127,0,0.5)",
              margin: "10px",
              "&:hover": { backgroundColor: "rgba(0,127,0,1)" },
            }}
            onClick={() =>
              handleTheme({
                backgroundColor:
                  "linear-gradient(239.26deg, rgba(0, 225, 12, 0.3) 20%, rgba(255, 252, 0, 0.3) 94.92%)",
                messageBubbleColor: "white",
                textColor: "black",
              })
            }
          >
            Meadows
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "rgba(0,150,150,0.4)",
              margin: "10px",
              "&:hover": { backgroundColor: "rgba(0,150,150,1)" },
            }}
            onClick={openCustomThemeModal}
          >
            Custom Theme
          </Button>
        </ModalContent>
      </Modal>
      <Modal
        open={customThemeModalOpen}
        onClose={closeCustomThemeModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Modal content */}
        <Box
          sx={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: 24,
            px: 20,
            py: 5,
            // minWidth: 300,
            backgroundColor: "rgba(255,255,255,0.5)",
          }}
        >
          <Typography
            align="center"
            variant="h5"
            fontWeight="bold"
            color="text.primary"
          >
            Custom Theme
          </Typography>
          <Box sx={{ margin: "10px" }}>
            <ChromePicker
              disableAlpha
              color={customTheme.backgroundColor1}
              onChange={handleCustomThemeChange1}
            />
          </Box>
          <Box sx={{ margin: "10px" }}>
            <ChromePicker
              disableAlpha
              color={customTheme.backgroundColor2}
              onChange={handleCustomThemeChange2}
            />
          </Box>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Gradient Percentage: {customTheme.gradientPercentage}%
          </Typography>
          <Slider
            value={customTheme.gradientPercentage}
            onChange={handleCustomThemeSliderChange}
            min={0}
            max={50}
            step={1}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCustomThemeSubmit}
          >
            Apply
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Chat;
