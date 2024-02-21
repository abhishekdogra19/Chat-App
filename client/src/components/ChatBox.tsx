import { useChatContext } from "@/context/chatContextUtils";
import React from "react";
import { Button } from "./ui/button";
import { BsArrowLeft } from "react-icons/bs";
import { getSender, getSenderFull } from "./config/ChatLogic";
import Modal from "./Modal";
import { Input } from "./ui/input";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
interface ChatBoxProps {
  fetchAgain: boolean;
  setFetchAgain: (obj: boolean) => void;
}
const ChatBox: React.FC<ChatBoxProps> = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = useChatContext();
  return (
    <div
      className={`${
        selectedChat ? "flex" : "hidden"
      } sm:flex lg:w-2/3 w-full border-secondary border `}
    >
      {selectedChat ? (
        <div
          className="w-full
        flex flex-col
        justify-between"
        >
          <div className="flex items-baseline w-full bg-secondary ">
            <Button className="sm:hidden" onClick={() => setSelectedChat(null)}>
              <BsArrowLeft className="font-bold" />
            </Button>
            {!selectedChat.isGroupChat ? (
              <div className="flex  w-full items-center pl-2 ">
                <h1 className="w-full capitalize text-center sm:text-left text-xl font-semibold">
                  {getSender(user, selectedChat.users)}
                </h1>
                <div>
                  <Modal user={getSenderFull(user, selectedChat.users)} />
                </div>
              </div>
            ) : (
              <div className="text-xl flex justify-between w-full px-2">
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </div>
            )}
          </div>
          <div className="overflow-hidden flex flex-col  justify-end rounded-lg ">
            {/* Messages Here */}
            <div className="overflow-scroll px-4 lg:px-10 py-4"></div>
            {/* Send Message */}
            <div className="flex gap-1 ">
              <div className="w-full">
                <Input className="bg-input text-primary " />
              </div>
              <Button>Send</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <p className="text-xl">
            To read the message, please select any chat.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
