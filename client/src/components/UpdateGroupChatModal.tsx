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
} from "./ui/credenza";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { useChatContext } from "@/context/chatContextUtils";
import { InfoIcon, Loader2 } from "lucide-react";
import UserBadgeItem from "./UserBadgeItem";
import ChatLoading from "./ChatLoading";
import SearchUserList from "./SearchUserList";
import axios, { AxiosError } from "axios";
interface Userobj {
  _id: string;
  email: string;
  name: string;
  pic: string;
}
interface UpdateGroupChatModalProps {
  fetchAgain: boolean;
  setFetchAgain: (obj: boolean) => void;
}
const UpdateGroupChatModal: React.FC<UpdateGroupChatModalProps> = ({
  fetchAgain,
  setFetchAgain,
}) => {
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<Userobj[]>([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const { toast } = useToast();
  const { user, selectedChat, setSelectedChat } = useChatContext();
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
  const handleRename = async () => {
    if (!groupChatName || !selectedChat) return;
    try {
      setRenameLoading(true);
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(response.data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      setGroupModalOpen(false);
    } catch (err) {
      const error = err as AxiosError<Error>;
      toast({
        title: "Error during Updating Group name",
        description: error.response?.data.message,
        variant: "destructive",
      });
    }
    setGroupChatName("");
  };
  const handleRemove = async (userToRemove: Userobj | null) => {
    if (!userToRemove || !selectedChat || !user) return;
    if (
      selectedChat.groupAdmin._id !== user._id &&
      userToRemove._id !== user._id
    ) {
      toast({
        title: "Only admins can remove someone!",
        description: "Unauthorized",
        variant: "destructive",
      });
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
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: userToRemove._id,
        },
        config
      );
      userToRemove._id === user._id
        ? setSelectedChat(null)
        : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (err) {
      const error = err as AxiosError<Error>;
      toast({
        title: "Error during Updating Group name",
        description: error.response?.data.message,
        variant: "destructive",
      });
    }
  };
  const handleAddUser = async (userToAdd: Userobj) => {
    if (!user || !selectedChat) return;
    if (selectedChat.users.find((user) => user._id === userToAdd._id)) {
      toast({
        title: "User already added",
        description: "Please add different user",
        variant: "destructive",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only Admin can add someone!",
        description: "Unauthorized",
        variant: "destructive",
      });
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
      const response = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );
      setSelectedChat(response.data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (err) {
      const error = err as AxiosError<Error>;
      toast({
        title: "Error during Updating Group name",
        description: error.response?.data.message,
        variant: "destructive",
      });
    }
  };
  return (
    <Credenza open={groupModalOpen} onOpenChange={setGroupModalOpen}>
      <CredenzaTrigger asChild>
        <Button className="px-2 sm:px-10">
          <span className="flex items-center p-0.5  gap-1 text-xs sm:text-lg">
            <InfoIcon />
          </span>
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader className="capitalize flex justify-center items-center my-1">
          <CredenzaTitle className="border-b-4 w-full font-semibold text-center p-2 text-xs sm:text-2xl">
            Edit Group Chat
          </CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <div className="w-full flex flex-col gap-2 ">
            <div className="flex gap-2">
              <div className="w-full">
                <Input
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                  placeholder="Enter Group Name"
                />
              </div>
              <Button
                className="bg-green-700 text-white"
                onClick={handleRename}
              >
                Update
              </Button>
            </div>
            <Input
              placeholder="Add Users: Abhi, Jane, John"
              className="w-full"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center text-xs sm:text:lg gap-1 p-2 mt-2">
            {renameloading ? (
              <Loader2 />
            ) : (
              selectedChat?.users.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleRemove(user)}
                />
              ))
            )}
          </div>

          {loading ? (
            <div className="p-10 overflow-x-hidden overflow-y-scroll h-56  ">
              <ChatLoading />
            </div>
          ) : (
            <div
              className={` overflow-x-hidden overflow-y-scroll  ${
                searchResult.length > 0 ? " h-56 p-4 sm:px-6" : "h-0"
              } `}
            >
              {searchResult?.map((user) => {
                return (
                  <SearchUserList
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                );
              })}
            </div>
          )}
        </CredenzaBody>
        <CredenzaFooter>
          <Button
            className="bg-red-600 hover:bg-red-900 text-white"
            onClick={() => handleRemove(user)}
          >
            Leave Group
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default UpdateGroupChatModal;
