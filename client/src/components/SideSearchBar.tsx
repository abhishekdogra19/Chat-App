import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { MdPersonSearch } from "react-icons/md";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

import { useToast } from "./ui/use-toast";
import axios from "axios";
import ChatLoading from "./ChatLoading";
interface Userobj {
  _id: string;
  email: string;
  name: string;
  pic: string;
}
const SideSearchBar: React.FC = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<Userobj[]>([]);
  const [loading, setLoading] = useState(false);
  // const [loadingChat, setLoadingChat] = useState();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        variant: "destructive",
      });
    }
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );
      setSearchResult(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center bg-primary text-primary-foreground px-4 py-2 rounded-xl gap-1 ">
        <MdPersonSearch />
        <span className="hidden sm:block whitespace-nowrap">Search User</span>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[540px]" side={"left"}>
        <SheetHeader className="border-b-2 border-primary">
          <SheetTitle>Search User</SheetTitle>
        </SheetHeader>
        <div className="grid grid-flow-col gap-1 py-4">
          <Input
            className="grow grid-cols-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button className="flex gap-1 " onClick={handleSearch}>
            <SearchIcon />
            <span className="hidden sm:block">Go</span>
          </Button>
        </div>
        {loading && <ChatLoading />}
        {!loading &&
          (searchResult.length > 0 ? (
            searchResult.map((user) => (
              <SheetDescription key={user._id}>
                {/* Tomorrow will be making user list item  */}
                {/* i will complete 11 12 */}
                {/* Start Planing on intership project */}
                {/* You are doing great */}
              </SheetDescription>
            ))
          ) : (
            <>
              <p>No user has been identified with the specified username.</p>
            </>
          ))}
      </SheetContent>
    </Sheet>
  );
};
export default SideSearchBar;
