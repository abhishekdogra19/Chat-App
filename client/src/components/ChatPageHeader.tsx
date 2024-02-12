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

const ChatPageHeader: React.FC = () => {
  const { user, setUser } = useChatContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const logoutHandler = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/logout");
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
      <div className="bg-primary-foreground flex justify-between items-center w-full p-2">
        <SideSearchBar />
        <div className="w-full text-center flex justify-center items-center gap-2">
          <BsChatSquareText className="text-xs sm:text-2xl" />
          <span className="text-xs sm:text-xl lg:text-3xl px-2 font-bold uppercase">
            Spark Talk
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaBell className="text-xs sm:text-xl cursor-pointer text-primary" />
            <DropdownMenu>
              {" "}
              <DropdownMenuTrigger>
                <Avatar className="border-4 border-primary size-8 sm:size-10">
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
                  className="w-full bg-primary text-primary-foreground flex items-center justify-center mt-1 py-2 rounded-sm hover:brightness-90"
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