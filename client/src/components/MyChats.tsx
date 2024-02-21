import { useChatContext } from "@/context/chatContextUtils";
import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import ChatLoading from "./ChatLoading";
import { getSender } from "./config/ChatLogic";
import GroupChatModal from "./GroupChatModal";
import { MdGroup } from "react-icons/md";

interface Userobj {
  _id: string;
  email: string;
  name: string;
  pic: string;
}

interface MyChatsProps {
  fetchAgain: boolean;
}

const MyChats: React.FC<MyChatsProps> = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats, ready } =
    useChatContext();
  const [loggedUser, setLoggedUser] = useState<Userobj | null>();
  const { toast } = useToast();
  useEffect(() => {
    if (!ready) return;
    const handleFetchChats = async () => {
      setLoggedUser(user);
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get("/api/chat", config);
        setChats(data);
      } catch (err) {
        const error = err as AxiosError<Error>;
        toast({
          title: "Failed to load the chats",
          description: error.response?.data.message,
          variant: "destructive",
        });
      }
    };
    handleFetchChats();
  }, [ready, user, toast, setChats, fetchAgain]);
  return (
    <div
      className={` ${
        selectedChat ? " hidden" : "block"
      } lg:block lg:w-1/3 w-full sm:p-4 overflow-hidden`}
    >
      <div className="w-full justify-between flex items-center">
        <h1 className="font-semibold text-base sm:text-base ">My Chats</h1>
        <GroupChatModal />
      </div>
      <div className="overflow-y-hidden flex flex-col p-3 bg-primary-foreground text-primary w-full h-full rounded-lg">
        {chats && loggedUser ? (
          <div className="overflow-y-scroll">
            {chats.map((chat) => (
              <div
                onClick={() => setSelectedChat(chat)}
                className={`capitalize cursor-pointer mt-2 rounded-lg px-2 py-4 duration-300 ${
                  selectedChat == chat ? " bg-blue-700 " : "bg-primary"
                } ${
                  selectedChat == chat
                    ? " text-white "
                    : "text-primary-foreground"
                } `}
                key={chat._id}
              >
                {!chat.isGroupChat ? (
                  getSender(loggedUser, chat.users)
                ) : (
                  <span className="flex items-center gap-1">
                    <MdGroup className="size-8  mr-1" />
                    {chat.chatName}
                  </span>
                )}
              </div>
            ))}{" "}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;
