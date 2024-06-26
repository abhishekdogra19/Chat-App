import ChatBox from "@/components/ChatBox";
import MyChats from "@/components/MyChats";
import { useChatContext } from "@/context/chatContextUtils";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatPageHeader from "@/components/ChatPageHeader";

const ChatPage: React.FC = () => {
  const { ready, user } = useChatContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (ready && !user) {
      navigate("/");
    }
  }, [navigate, ready, user]);
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div className="w-full overflow-hidden">
      {user && <ChatPageHeader />}
      <div className="flex justify-between w-full h-[90vh] p-2.5">
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        {user && <MyChats fetchAgain={fetchAgain} />}
      </div>
    </div>
  );
};

export default ChatPage;
