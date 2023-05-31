import React from "react";
import { Box, Grow } from "@mui/material";
const MessageBubble = ({ text, theme, offset, imageSrc }) => {
  return (
    <Box>
      <Grow in={true} timeout={500 * offset}>
        <Box
          sx={{
            padding: "10px 20px 10px 20px",
            borderRadius: "20px",
            borderTopLeftRadius: "0px",
            margin: "10px 0",
            lineHeight: "25px",
            width: "fit-content",
            maxWidth: "250px",
            background: theme.messageBubbleColor,
            color: theme.textColor,
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Message Image"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : (
            <p>{text}</p>
          )}
        </Box>
      </Grow>
    </Box>
  );
};

export default MessageBubble;
