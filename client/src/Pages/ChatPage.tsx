import Header from "@/components/Header";
import { useChatContext } from "@/context/chatContextUtils";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatPage: React.FC = () => {
  const { user } = useChatContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);
  return (
    <div>
      <Header />
      ChatPage
    </div>
  );
};

export default ChatPage;
