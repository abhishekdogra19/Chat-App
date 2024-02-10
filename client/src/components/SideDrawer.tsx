import React, { useState } from "react";
import { Button } from "./ui/button";
import { MdPersonSearch } from "react-icons/md";
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

const SideDrawer: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = useChatContext();
  return (
    <>
      <div className="bg-primary-foreground flex justify-between items-center w-full p-2">
        <Button className="flex items-center gap-1">
          <MdPersonSearch />
          <span className="hidden sm:block">Search User</span>
        </Button>
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
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
