import React from "react";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { EyeIcon, MailIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BsPerson } from "react-icons/bs";
interface Userobj {
  id?: string;
  _id?: string;
  email: string;
  name: string;
  pic: string;
}

interface ModalProps {
  children?: React.ReactNode;
  user?: Userobj;
}
const Modal: React.FC<ModalProps> = ({ user, children }) => {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button className="w-full">{children ? "Profile" : <EyeIcon />}</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader className="capitalize flex justify-center items-center my-1">
          <CredenzaTitle className="border-b-4 w-full text-center pb-1 text-xl sm:text-2xl">
            <span className="flex items-center justify-center gap-1">
              <BsPerson />
              {user?.name}
            </span>
          </CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="flex flex-col items-center  sm:mt-2 gap-1">
          {/* Left here going outside will continue it from here
            11
            12
            start
          */}
          <Avatar className="rounded-full overflow-hidden border-4 border-primary size-28 sm:size-32">
            <AvatarImage
              src={user?.pic}
              className="h-full w-full object-cover object-center "
            />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
          <h1 className="text-xl mt-3 font-semibold flex items-center gap-1">
            <MailIcon /> {user?.email}
          </h1>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button className="bg-red-500 text-white font-semibold hover:bg-red-800">
              Close
            </Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default Modal;
