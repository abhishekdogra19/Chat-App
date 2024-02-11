import React from "react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";

interface Userobj {
  _id: string;
  email: string;
  name: string;
  pic: string;
}

interface SearchUserListProps {
  user: Userobj;
  handleFunction: () => void;
}
const SearchUserList: React.FC<SearchUserListProps> = ({
  user,
  handleFunction,
}) => {
  return (
    <div
      className="text-primary text-xs mt-2 sm:mt-3 rounded-xl bg-primary-foreground px-2 py-3 cursor-pointer h-20 sm:h-28 flex items-center gap-2 sm:gap-3 overflow-hidden hover:brightness-125"
      onClick={handleFunction}
    >
      <Avatar className="border-4 border-primary size-14 sm:size-20">
        <AvatarImage src={user?.pic} />
      </Avatar>
      <div>
        <h1 className="ml-1 capitalize mb-2 font-semibold text-lg sm:text-2xl leading-5 ">
          {user.name}
        </h1>
        <p className="text-xs sm:text-lg">Email: {user.email}</p>
      </div>
    </div>
  );
};

export default SearchUserList;
