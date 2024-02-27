import React from "react";
import { BsChatSquareText } from "react-icons/bs";
import { ModeToggle } from "./mode-toggle";
import { FaBell } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatContext } from "@/context/chatContextUtils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "./Modal";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import SideSearchBar from "./SideSearchBar";
import { getSender } from "./config/ChatLogic";
const ChatPageHeader: React.FC = () => {
  const { user, setUser, notification, setNotification, setSelectedChat } =
    useChatContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const logoutHandler = async () => {
    try {
      await axios.post("/api/user/logout");
      toast({
        title: "Logout Successfully",
        description: "Please wait...",
      });
      setTimeout(() => {
        setUser(null);
        navigate("/");
      }, 1500);
    } catch (err) {
      const error = err as AxiosError<Error>;
      toast({
        title: "Error during logging out",
        description: error.response?.data.message,
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <div className="bg-popover flex justify-between items-center w-full p-2">
        <SideSearchBar />
        <div className="w-full text-center flex justify-center items-center ">
          <BsChatSquareText className="text-xs sm:text-2xl" />
          <span className="text-xs sm:text-xs lg:text-3xl pl-1 font-bold uppercase">
            Spark Talk
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-4">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FaBell
                  className={`text-xs sm:text-xl cursor-pointer text-popover-foreground ${
                    notification.length > 0 ? " animate-pulse " : ""
                  }`}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {notification.length == 0 && "No New Messages"}
                {notification &&
                  notification.map((singleNotifi) => {
                    return (
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedChat(singleNotifi.chat);
                          setNotification(
                            notification.filter(
                              (noti) => noti.chat !== singleNotifi.chat
                            )
                          );
                        }}
                        key={singleNotifi._id}
                        className="w-full bg-popover text-black flex items-center justify-center mt-1 py-2 rounded-sm hover:brightness-90"
                      >
                        {singleNotifi.chat.isGroupChat
                          ? `New Message in ${singleNotifi.chat.chatName}`
                          : `New Message from ${getSender(
                              user,
                              singleNotifi.chat.users
                            )}`}
                      </DropdownMenuItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="border-4 border-popover-foreground size-8 sm:size-10">
                  <AvatarImage src={user?.pic} />
                  <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user && (
                  <Modal user={user}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Modal>
                )}
                <DropdownMenuItem
                  className="w-full bg-popover text-popover-foreground flex items-center justify-center mt-1 py-2 rounded-sm hover:bg-primary active:bg-primary"
                  onClick={logoutHandler}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};

export default ChatPageHeader;
