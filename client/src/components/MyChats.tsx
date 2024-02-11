import { useChatContext } from "@/context/chatContextUtils";
import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

interface Userobj {
  _id: string;
  email: string;
  name: string;
  pic: string;
}

const MyChats: React.FC = () => {
  const { selectedChat, setSelectedChat, user, chats, setChats, ready } =
    useChatContext();
  const [loggedUser, setLoggedUser] = useState<Userobj | null>();
  const { toast } = useToast();

  useEffect(() => {
    if (!ready) return;
    const fetchChats = async () => {
      setLoggedUser(user);
      try {
        const token = Cookies.get("token");
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          "http://localhost:5000/api/chat",
          config
        );
        console.log("data ", data);
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
    fetchChats();
  }, [ready, user, toast, setChats]);
  return (
    <div className={` ${selectedChat ? "hidden" : "block"} sm:block`}>
      <div>
        <h1>My Chats</h1>
        <Button>
          New Group Chat <PlusIcon />
        </Button>
      </div>
      {chats.map((chat) => (
        <div
          onClick={() => setSelectedChat(chat)}
          className="cursor-pointer"
          key={chat._id}
        ></div>
      ))}
    </div>
  );
};

export default MyChats;
