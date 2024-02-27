import React from "react";
import { Badge } from "@/components/ui/badge";

interface Userobj {
  _id: string;
  email: string;
  name: string;
  pic: string;
}
interface UserBadgeItemProps {
  user: Userobj;
  handleFunction: () => void;
}
const UserBadgeItem: React.FC<UserBadgeItemProps> = ({
  user,
  handleFunction,
}) => {
  return (
    <Badge
      variant="default"
      className="flex gap-1 px-2 py-1 bg-popover-foreground text-popover"
    >
      <span className="capitalize">{user.name}</span>
      <span
        className="bg-primary-foreground cursor-pointer text-popover   rounded-full"
        onClick={handleFunction}
      >
        x
      </span>
    </Badge>
  );
};

export default UserBadgeItem;
