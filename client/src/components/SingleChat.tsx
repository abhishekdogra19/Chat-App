import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { BsArrowLeft } from "react-icons/bs";
import { getSender, getSenderFull } from "./config/ChatLogic";
import Modal from "./Modal";
import Cookies from "js-cookie";
import { Input } from "./ui/input";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { useChatContext } from "@/context/chatContextUtils";
import { FaSpinner } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { useToast } from "./ui/use-toast";
import ChatScroll from "./ChatScroll";

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

interface SingleChatProps {
  fetchAgain: boolean;
  setFetchAgain: (obj: boolean) => void;
}
const SingleChat: React.FC<SingleChatProps> = ({
  fetchAgain,
  setFetchAgain,
}) => {
  const [messages, setMessages] = useState<messageObj[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { user, selectedChat, setSelectedChat } = useChatContext();
  const { toast } = useToast();
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `/api/message/${selectedChat?._id}`,
          config
        );
        console.log(response.data);
        setMessages(response.data);
        setLoading(false);
      } catch (err) {
        const error = err as AxiosError<Error>;
        toast({
          title: "Error during fetching messages",
          description: error.response?.data.message,
          variant: "destructive",
        });
      }
    };
    fetchMessages();
  }, [selectedChat, toast, selectedChat?.users]);

  const sendMessage = async () => {
    if (newMessage) {
      console.log("Sending message:", newMessage);
      // Add your logic to send the message
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        setNewMessage(""); // Clear the input after sending
        const response = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat?._id,
          },
          config
        );
        console.log(response.data);
        setMessages([...messages, response.data]);
        setLoading(false);
      } catch (err) {
        const error = err as AxiosError<Error>;
        toast({
          title: "Error during sending message",
          description: error.response?.data.message,
          variant: "destructive",
        });
      }
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && newMessage) {
      sendMessage();
    }
  };
  const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    // Tying indicator logic
  };
  return (
    <>
      {selectedChat ? (
        <div
          className="w-full
        flex flex-col
        justify-between"
        >
          <div className="flex items-baseline w-full bg-secondary ">
            <Button className="lg:hidden" onClick={() => setSelectedChat(null)}>
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
          <div className="overflow-hidden flex flex-col  justify-end rounded-lg h-full p-1">
            {/* Messages Here */}
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <FaSpinner className="animate-spin size-8 lg:size-16 " />
              </div>
            ) : (
              <div className="overflow-y-scroll  px-4 lg:px-10 py-4 text-primary">
                <ChatScroll messages={messages} />
              </div>
            )}

            {/* Send Message */}
            <div className="flex gap-1 p-1 ">
              <div className="w-full px-1 ">
                <Input
                  className="bg-input text-primary "
                  placeholder="Enter a message..."
                  required={true}
                  onChange={typingHandler}
                  value={newMessage}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <Button onClick={sendMessage}>Send</Button>
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
    </>
  );
};

export default SingleChat;
