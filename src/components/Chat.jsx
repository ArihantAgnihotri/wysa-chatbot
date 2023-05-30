import React, { useState } from "react";
import {
  Button,
  Box,
  Modal,
  Typography,
  Tooltip,
  Grow,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { Settings, Send } from "@mui/icons-material";

// const ChatContainer = styled("div")({
//   height: "auto",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "left",
//   alignItems: "left",
//   padding: "10px",
// });
const ChatContainer = styled("div")({
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "left",
  padding: "10px",
  marginBottom: "56px", // Add this line to create space for the text input bar
});

const MessageBubble = styled(Box)({
  padding: "10px 20px 10px 20px",
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
  const [selectedColor, setSelectedColor] = useState("white");
  const [theme, setTheme] = useState({
    backgroundColor:
      "linear-gradient(239.26deg, rgb(221, 238, 237) 63.17%, rgb(253, 241, 224) 94.92%)",
    messageBubbleColor: "white",
    textColor: "black",
  });

  const handleLogout = () => {
    localStorage.removeItem("username");
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

  const handleTheme = ({ backgroundColor, messageBubbleColor, textColor }) => {
    setTheme({
      backgroundColor: backgroundColor,
      messageBubbleColor: messageBubbleColor,
      textColor: textColor,
    });
    setColorModalOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <ChatContainer
        sx={{
          paddingTop: { xs: "20px", md: "50px" },
          paddingLeft: { xs: "40px", md: "450px" },
        }}
      >
        <TopRightIcon onClick={openModal}>
          <Tooltip title="Settings">
            <Settings sx={{ color: "gray" }} />
          </Tooltip>
        </TopRightIcon>
        <Grow in={true} timeout={500}>
          <MessageBubble
            sx={{
              background: theme.messageBubbleColor,
              color: theme.textColor,
            }}
          >
            <Tooltip open={username.length > 30} title={username}>
              <p>{`Hi there, ${
                username.length > 30 ? username.slice(0, 30) + "..." : username
              } 👋`}</p>
            </Tooltip>
          </MessageBubble>
        </Grow>
        <Grow in={true} timeout={1000}>
          <MessageBubble
            sx={{
              background: theme.messageBubbleColor,
              color: theme.textColor,
            }}
          >
            <p>Im Wysa- an AI chatbot built by therapists</p>
          </MessageBubble>
        </Grow>
        <Grow in={true} timeout={1500}>
          <MessageBubble
            sx={{
              background: theme.messageBubbleColor,
              color: theme.textColor,
            }}
          >
            <p>
              I'm here to understand your concerns and connect you with the best
              resources available to support you
            </p>
          </MessageBubble>
        </Grow>
        <Grow in={true} timeout={2000}>
          <MessageBubble
            sx={{
              background: theme.messageBubbleColor,
              color: theme.textColor,
              borderTopLeftRadius: "0px",
            }}
          >
            <p>Can I help?</p>
          </MessageBubble>
        </Grow>
      </ChatContainer>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
          paddingTop: "0px",
          borderTop: "1px solid #ccc",
        }}
      > */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          position: "fixed",
          bottom: "10px", // Position the bar at the bottom
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
            onClick={handleLogout}
          >
            Logout
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
              backgroundColor: "white",
              color: "black",
              margin: "10px",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.5)" },
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
              backgroundColor: "black",
              margin: "10px",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
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
              backgroundColor: "orange",
              margin: "10px",
              "&:hover": { backgroundColor: "rgba(255,165,0,0.5)" },
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
              backgroundColor: "green",
              margin: "10px",
              "&:hover": { backgroundColor: "rgba(0,127,0,0.5)" },
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
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Chat;
// import React, { useState } from "react";
// import { Button, Box, Modal, Typography, Tooltip, Grow } from "@mui/material";
// import { styled } from "@mui/system";
// import { useNavigate, useParams } from "react-router-dom";
// import { Settings } from "@mui/icons-material";

// const ChatContainer = styled("div")({
//   height: "100vh",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "left",
//   alignItems: "left",
//   padding: "10px",
// });

// const MessageBubble = styled(Box)({
//   padding: "10px 20px 10px 20px",
//   borderRadius: "20px",
//   margin: "10px 0",
//   lineHeight: "25px",
//   width: "fit-content",
//   maxWidth: "250px",
// });

// const TopRightIcon = styled("div")({
//   position: "fixed",
//   top: "10px",
//   right: "10px",
//   zIndex: "9999",
//   cursor: "pointer",
//   transition: "filter 0.3s ease-in-out",
//   "&:hover": {
//     filter: "drop-shadow(0 0 8px rgba(0, 0, 255, 0.5))",
//   },
// });

// const ModalContent = styled(Box)({
//   background: "rgba(255, 255, 255, 0.5)",
//   padding: "50px",
//   borderRadius: "10px",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   outline: "none",
// });

// const Chat = () => {
//   const navigate = useNavigate();
//   const { username } = useParams();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [colorModalOpen, setColorModalOpen] = useState(false);
//   const [selectedColor, setSelectedColor] = useState("white");
//   const [theme, setTheme] = useState({
//     backgroundColor:
//       "linear-gradient(239.26deg, rgb(221, 238, 237) 63.17%, rgb(253, 241, 224) 94.92%)",
//     messageBubbleColor: "white",
//     textColor: "black",
//   });

//   const handleLogout = () => {
//     localStorage.removeItem("username");
//     navigate("/login");
//   };

//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   const handleColorModalOpen = () => {
//     setColorModalOpen(true);
//   };

//   const handleColorModalClose = () => {
//     setColorModalOpen(false);
//   };

//   const handleTheme = ({ backgroundColor, messageBubbleColor, textColor }) => {
//     setTheme({
//       backgroundColor,
//       messageBubbleColor,
//       textColor,
//     });
//     setColorModalOpen(false);
//   };

//   const renderMessageBubble = (text, isLast) => {
//     return (
//       <Grow in={true} timeout={500}>
//         <MessageBubble
//           sx={{
//             background: theme.messageBubbleColor,
//             color: theme.textColor,
//             borderTopLeftRadius: isLast ? "0px" : "20px",
//           }}
//         >
//           <p>{text}</p>
//         </MessageBubble>
//       </Grow>
//     );
//   };

//   return (
//     <Box sx={{ height: "100vh" }}>
//       <ChatContainer
//         sx={{
//           background: theme.backgroundColor,
//           color: theme.textColor,
//           paddingTop: { xs: "20px", md: "50px" },
//           paddingLeft: { xs: "40px", md: "450px" },
//         }}
//       >
//         <Grow in={true} timeout={2000}>
//           <TopRightIcon onClick={openModal}>
//             <Tooltip title="Settings">
//               <Settings sx={{ color: "gray" }} />
//             </Tooltip>
//           </TopRightIcon>
//         </Grow>

//         {renderMessageBubble(
//           `Hi there, ${
//             username.length > 30 ? username.slice(0, 30) + "..." : username
//           } 👋`
//         )}
//         {renderMessageBubble("Im Wysa- an AI chatbot built by therapists")}
//         {renderMessageBubble(
//           "I'm here to understand your concerns and connect you with the best resources available to support you"
//         )}
//         {renderMessageBubble("Can I help?", true)}
//       </ChatContainer>
//       <Modal
//         open={modalOpen}
//         onClose={closeModal}
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <ModalContent>
//           <Typography variant="h5" fontWeight="bold">
//             Settings
//           </Typography>
//           <Button
//             sx={{
//               margin: "20px",
//               backgroundColor: "rgba(200,0,0,0.7)",
//               "&:hover": { backgroundColor: "rgba(200,0,0,0.5)" },
//             }}
//             variant="contained"
//             color="primary"
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleColorModalOpen}
//             sx={{
//               backgroundColor: "rgba(0, 80, 255, 0.8)",
//               "&:hover": { backgroundColor: "rgba(0,80,255,0.5)" },
//             }}
//           >
//             Change Theme
//           </Button>
//         </ModalContent>
//       </Modal>

//       <Modal
//         open={colorModalOpen}
//         onClose={handleColorModalClose}
//         sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
//       >
//         <ModalContent>
//           <Typography variant="h5" fontWeight="bold">
//             Select Color
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{
//               backgroundColor: "white",
//               color: "black",
//               margin: "10px",
//               "&:hover": { backgroundColor: "rgba(255,255,255,0.5)" },
//             }}
//             onClick={() =>
//               handleTheme({
//                 backgroundColor:
//                   "linear-gradient(239.26deg, rgb(221, 238, 237) 63.17%, rgb(253, 241, 224) 94.92%)",
//                 messageBubbleColor: "white",
//                 textColor: "black",
//               })
//             }
//           >
//             Light
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{
//               backgroundColor: "black",
//               margin: "10px",
//               "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
//             }}
//             onClick={() =>
//               handleTheme({
//                 backgroundColor:
//                   "linear-gradient(239.26deg, rgb(0, 0, 0) 40%, rgb(51, 51, 51) 94.92%)",
//                 messageBubbleColor: "rgba(62, 31, 47, 0.8)",
//                 textColor: "rgba(255,255,255,0.9)",
//               })
//             }
//           >
//             Dark
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{
//               backgroundColor: "orange",
//               margin: "10px",
//               "&:hover": { backgroundColor: "rgba(255,165,0,0.5)" },
//             }}
//             onClick={() =>
//               handleTheme({
//                 backgroundColor:
//                   "linear-gradient(239.26deg, rgba(246, 95, 0, 0.3) 50%, rgba(0, 80, 150, 0.3) 94.92%)",
//                 messageBubbleColor: "white",
//                 textColor: "black",
//               })
//             }
//           >
//             Sunset
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{
//               backgroundColor: "green",
//               margin: "10px",
//               "&:hover": { backgroundColor: "rgba(0,127,0,0.5)" },
//             }}
//             onClick={() =>
//               handleTheme({
//                 backgroundColor:
//                   "linear-gradient(239.26deg, rgba(0, 225, 12, 0.3) 20%, rgba(255, 252, 0, 0.3) 94.92%)",
//                 messageBubbleColor: "white",
//                 textColor: "black",
//               })
//             }
//           >
//             Countryside
//           </Button>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default Chat;
