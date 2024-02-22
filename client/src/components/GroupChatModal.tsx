import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { useChatContext } from "@/context/chatContextUtils";
import { MdGroupAdd, MdPersonAdd } from "react-icons/md";
import axios, { AxiosError } from "axios";
import ChatLoading from "./ChatLoading";
import SearchUserList from "./SearchUserList";
import UserBadgeItem from "./UserBadgeItem";

interface Userobj {
  _id: string;
  email: string;
  name: string;
  pic: string;
}
const GroupChatModal: React.FC = () => {
  const [groupChatName, setGroupChatName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<Userobj[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Userobj[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const { chats, setChats } = useChatContext();

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(response.data);
      setLoading(false);
    } catch (err) {
      const error = err as AxiosError<Error>;
      toast({
        title: "Error during searching user",
        description: error.response?.data.message,
        variant: "destructive",
      });
    }
  };
  const handleGroup = (userToAdd: Userobj) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        description: "Please add different user",
        variant: "destructive",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleDelete = (userToDelete: Userobj) => {
    const ArrayWithOutUserToBeDeleted = selectedUsers.filter(
      (user) => user._id !== userToDelete._id
    );
    setSelectedUsers([...ArrayWithOutUserToBeDeleted]);
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        variant: "destructive",
      });
      return;
    }
    try {
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        },
        config
      );
      setChats([data, ...chats]);
      toast({
        title: "New Group Chat Created",
        variant: "default",
        color: "green",
      });
      setCreateGroupModalOpen(!createGroupModalOpen);
    } catch (err) {
      const error = err as AxiosError<Error>;
      toast({
        title: "Error during creating Group",
        description: error.response?.data.message,
        variant: "destructive",
      });
    }
  };
  return (
    <Credenza
      open={createGroupModalOpen}
      onOpenChange={setCreateGroupModalOpen}
    >
      <CredenzaTrigger asChild>
        <Button className="px-6 py-2 sm:px-3 font-semibold">
          <span className="flex items-center gap-1 text-xs ">
            Create Group
            <MdGroupAdd className="font-bold size-5" />
          </span>
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader className="capitalize flex justify-center items-center my-1">
          <CredenzaTitle className="border-b-4 w-full font-semibold text-center p-2 text-xl sm:text-2xl">
            Create Group Chat
          </CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="w-full flex flex-col gap-2 ">
            <Input
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
              placeholder="Enter Group Name"
            />
            <span className="flex gap-1 w-full  items-center justify-between ">
              <Input
                placeholder="Add Users: Abhi, Jane, John"
                className="w-56  sm:w-96 "
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Button className="flex gap-1 items-center justify-center w-[100%] ">
                <MdPersonAdd />
                Add
              </Button>
            </span>
          </div>
          <div className="flex text-xs sm:text:lg gap-1 p-2 mt-2">
            {selectedUsers?.map((user) => (
              <UserBadgeItem
                key={user._id}
                user={user}
                handleFunction={() => handleDelete(user)}
              />
            ))}
          </div>

          {loading ? (
            <div className="p-10 overflow-x-hidden overflow-y-scroll h-56  ">
              <ChatLoading />
            </div>
          ) : (
            <div
              className={` overflow-x-hidden overflow-y-scroll ${
                searchResult.length > 0 ? " h-56 p-4 sm:px-6" : "h-0"
              } `}
            >
              {searchResult?.map((user) => {
                return (
                  <SearchUserList
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                );
              })}
            </div>
          )}
        </CredenzaBody>
        <CredenzaFooter>
          <Button
            className="bg-green-800 text-white font-semibold w-full"
            onClick={handleSubmit}
          >
            Create Chat
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default GroupChatModal;
