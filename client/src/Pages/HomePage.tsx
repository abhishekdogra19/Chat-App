import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsChatSquareText } from "react-icons/bs";
import LoginForm from "../components/Authentication/LoginForm";
import SignUpForm from "../components/Authentication/SignUpForm";
import HomePageCarousel from "@/components/ui/HomePageCarousel";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../context/chatContextUtils";
import { ModeToggle } from "@/components/mode-toggle";
const HomePage: React.FC = () => {
  const { user } = useChatContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/chats");
    }
  }, [navigate, user]);
  return (
    <div className="min-h-screen lg:p-2 bg-popover p-6 ">
      <div className="flex gap-1 items-center justify-center text-primary bg-popover py-2">
        <div className="w-full text-popover-foreground text-center flex justify-center items-center gap-2">
          <BsChatSquareText className="text-2xl" />
          <span className="text-xs lg:text-3xl px-2 font-bold uppercase">
            Spark Talk
          </span>
        </div>
        <span>
          <ModeToggle />
        </span>
      </div>
      <div className="lg:flex   lg:items-start justify-center lg:gap-2 ">
        <div className="p-2 w-full ">
          <div className="h-60 sm:h-96 lg:h-full w-full overflow-hidden border-2 border-primary ">
            <div className="hidden lg:block lg:h-[87vh] overflow-hidden">
              <HomePageCarousel />
            </div>
            <div className="lg:hidden h-full w-full">
              <img
                src={
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt=""
                className="h-full w-full object-center object-cover"
              />
            </div>
          </div>
        </div>
        <div className="text-popover-foreground mt-2 lg:w-full lg:mt-10">
          <Tabs defaultValue="account" className="w-full ">
            <TabsList className="flex justify-around  bg-popover border lg:border-0 border-primary border-t-0 -mt-1  py-2 px-0">
              <TabsTrigger
                value="account"
                className="text-lg font-semibold duration-300 data-[state=active]:bg-primary  data-[state=active]:text-primary-foreground w-2/4 p-2"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="text-lg font-semibold duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground w-2/4 p-2 "
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <LoginForm />
            </TabsContent>
            <TabsContent value="password">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
