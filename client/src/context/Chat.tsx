import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface ChatProviderProps {
  children: React.ReactNode;
}

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

interface ChatContextValue {
  user: Userobj | null;
  setUser: (obj: Userobj | null) => void;
  ready: boolean;
  selectedChat: chatObj | null;
  setSelectedChat: (obj: chatObj | null) => void;
  chats: chatObj[];
  setChats: (obj: chatObj[]) => void;
}
export const ChatContext = createContext<ChatContextValue | null>(null);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Userobj | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [selectedChat, setSelectedChat] = useState<chatObj | null>(null);
  const [chats, setChats] = useState<chatObj[]>([]);
  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const response = await axios.get("/api/user/getUserProfile");
          setUser(response.data);
        } catch (error) {
          console.log("error");
        }
        setReady(true);
      };
      fetchUser();
    }
  }, [user]);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        ready,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
