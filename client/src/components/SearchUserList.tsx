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
      className="text-secondary-foreground text-xs mt-2 sm:mt-3 rounded-xl bg-secondary px-2 py-3 cursor-pointer h-20 sm:h-28 flex items-center gap-2 sm:gap-3 overflow-hidden hover:bg-secondary-foreground hover:text-secondary"
      onClick={handleFunction}
    >
      <Avatar className="border-4 border-secondary-foreground size-14 sm:size-16">
        <AvatarImage src={user?.pic} />
      </Avatar>
      <div>
        <h1 className="ml-1 capitalize mb-2 font-semibold text-xs sm:text-lg  leading-5 ">
          {user.name}
        </h1>
        <p className="text-xs">Email: {user.email}</p>
      </div>
    </div>
  );
};

export default SearchUserList;
