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

interface ChatContextValue {
  user: Userobj | null;
  setUser: (obj: Userobj | null) => void;
  ready: boolean;
}
export const ChatContext = createContext<ChatContextValue | null>(null);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Userobj | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/user/getUserProfile"
          );
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
    <ChatContext.Provider value={{ user, setUser, ready }}>
      {children}
    </ChatContext.Provider>
  );
};
