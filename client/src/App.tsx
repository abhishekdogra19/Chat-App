import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import { Toaster } from "./components/ui/toaster";
import "./App.css";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://chat-app-xv6u.onrender.com";
const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
