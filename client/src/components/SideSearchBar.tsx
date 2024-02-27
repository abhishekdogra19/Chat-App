import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { MdPersonSearch } from "react-icons/md";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";
import axios, { AxiosError } from "axios";
import ChatLoading from "./ChatLoading";
import SearchUserList from "./SearchUserList";
import { useChatContext } from "@/context/chatContextUtils";
interface Userobj {
  _id: string;
  email: string;
  name: string;
  pic: string;
}
const SideSearchBar: React.FC = () => {
  const { setSelectedChat, chats, setChats } = useChatContext();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<Userobj[]>([]);
  const [loading, setLoading] = useState(false);
  // const [loadingChat, setLoadingChat] = useState(false);
  const [openSidebar, setOpenSiderbar] = useState(false);
  const [searchBtnClicked, setSearchBtnClicked] = useState(false);
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        variant: "destructive",
      });
    }
    try {
      setLoading(true);
      setSearchBtnClicked(true);
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
  const accessChat = async (userId: string) => {
    try {
      const token = Cookies.get("token");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      // setLoadingChat(false);
      setSelectedChat(data);
      setOpenSiderbar(false);
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
    <Sheet open={openSidebar} onOpenChange={setOpenSiderbar}>
      <SheetTrigger className="flex items-center justify-center bg-primary hover:brightness-75 text-primary-foreground px-4 py-2 rounded-xl gap-1 ">
        <MdPersonSearch />
        <span className="hidden sm:block whitespace-nowrap">Search User</span>
      </SheetTrigger>

      <SheetContent className="w-[300px] sm:w-[540px]" side={"left"}>
        <SheetHeader className="border-b-2 border-secondary-foreground">
          <SheetTitle>Search User</SheetTitle>
        </SheetHeader>
        <div className="grid grid-flow-col gap-1 py-4">
          <Input
            className="grow grid-cols-3"
            value={search}
            placeholder="Enter Username "
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            className="flex gap-1 bg-secondary-foreground text-secondary hover:text-secondary-foreground "
            onClick={handleSearch}
          >
            <SearchIcon />
            <span className="hidden sm:block ">Go</span>
          </Button>
        </div>
        {loading && <ChatLoading />}
        <div className="overflow-y-scroll h-[85vh]">
          {!loading &&
            (searchResult.length > 0 ? (
              searchResult.map((user) => (
                <SearchUserList
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            ) : (
              <>
                {searchBtnClicked && (
                  <p>
                    No user has been identified with the specified username.
                  </p>
                )}
              </>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default SideSearchBar;
