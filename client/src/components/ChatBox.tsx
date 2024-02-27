import { useChatContext } from "@/context/chatContextUtils";
import React from "react";
import SingleChat from "./SingleChat";
interface ChatBoxProps {
  fetchAgain: boolean;
  setFetchAgain: (obj: boolean) => void;
}
const ChatBox: React.FC<ChatBoxProps> = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useChatContext();
  return (
    <div
      className={`${
        selectedChat ? "flex" : "hidden"
      } sm:flex lg:w-3/4 w-full   `}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBox;
