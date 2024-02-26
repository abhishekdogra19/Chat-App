import { useChatContext } from "@/context/chatContextUtils";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";

interface Userobj {
  _id: string;
  email: string;
  name: string;
  pic: string;
}

interface chatObj {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: Userobj[];
  createdAt: string;
  updatedAt: string;
  groupAdmin: Userobj;
}

interface messageObj {
  _id: string;
  content: string;
  chat: chatObj;
  sender: Userobj;
}
interface ChatScrollProps {
  messages: messageObj[];
}
const ChatScroll: React.FC<ChatScrollProps> = ({ messages }) => {
  const { user } = useChatContext();
  if (!user) return;
  return (
    <ScrollableFeed className="px-2 py-4">
      {messages &&
        messages.map((m) => (
          <div className="flex" key={m._id}>
            <span
              className={`text-xs max-w-[75%] px-4 py-2 rounded-2xl mt-2 ${
                user._id === m.sender._id
                  ? "text-right bg-blue-950 text-white ml-auto "
                  : "text-left bg-indigo-800 text-white"
              }`}
              style={{ wordWrap: "break-word" }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ChatScroll;
