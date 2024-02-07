import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LoginForm from "../components/Authentication/LoginForm";
import SignUpForm from "../components/Authentication/SignUpForm";
import HomePageCarousel from "@/components/ui/HomePageCarousel";
import Header from "@/components/Header";
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen  lg:h-screen overflow-hidden lg:p-2 bg-primary-foreground p-6 ">
      <Header />
      <div className="lg:flex   lg:items-start justify-center lg:gap-2 ">
        <div className=" border lg:border-0 p-2 border-primary w-full ">
          <div className="h-60 sm:h-96 lg:h-full w-full overflow-hidden ">
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
        <div className="text-primary mt-2 lg:w-full lg:h-screen lg:mt-10">
          <Tabs defaultValue="account" className="w-full ">
            <TabsList className="flex justify-around  bg-primary-foreground border lg:border-0 border-primary border-t-0 -mt-1  py-2">
              <TabsTrigger
                value="account"
                className="text-xl duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground    w-2/4 p-1"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="text-xl duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground w-2/4 p-1 "
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
