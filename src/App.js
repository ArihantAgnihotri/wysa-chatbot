import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Chat from "./components/Chat";
import Home from "./components/Home";
const App = () => {
  return (
    <BrowserRouter>
      <Box>
        <Routes>
          <Route path="/login" exact element={<Home />} />
          <Route path="/chat/:username" element={<Chat />} />
          <Route path="/*" element={<Home />}></Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
