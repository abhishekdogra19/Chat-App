import React, { useState } from "react";
("use client");
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CiMail } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "../ui/PasswordInput";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useChatContext } from "@/context/chatContextUtils";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(20),
});

interface Error {
  message: string[];
  statusCode: number;
}

const LoginForm: React.FC = () => {
  const { setUser } = useChatContext();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(response.data);
      toast({
        title: "Login Successfully",
        description: "Please wait...",
      });
      setTimeout(() => {
        navigate("/chats");
      }, 1500);
    } catch (err) {
      const error = err as AxiosError<Error>;
      toast({
        variant: "destructive",
        description: error.response?.data.message,
      });
    }
    setLoading(false);
  }
  return (
    <div className="px-4 py-1 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Email Address"
                    {...field}
                    suffix={<CiMail />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} placeholder="Enter Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
          </Button>
        </form>
      </Form>
      <Button
        variant={"secondary"}
        className="w-full bg-red-700 hover:bg-red-800 mt-2 text-slate-50 font-semibold"
        onClick={() => {
          onSubmit({ email: "guest@gmail.com", password: "guest@123" });
        }}
      >
        Login as Guest
      </Button>
    </div>
  );
};

export default LoginForm;
