import ChatBox from "@/components/ChatBox";
import MyChats from "@/components/MyChats";
import SideDrawer from "@/components/SideDrawer";
import { useChatContext } from "@/context/chatContextUtils";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatPage: React.FC = () => {
  const { ready, user } = useChatContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (ready && !user) {
      navigate("/");
    }
  }, [navigate, ready, user]);
  return (
    <div className="w-full">
      {user && <SideDrawer user={user} />}
      <div className="flex justify-between w-full h-[90vh] p-2.5">
        {user && <MyChats />}
        {user && <ChatBox />}
      </div>
    </div>
  );
};

export default ChatPage;
