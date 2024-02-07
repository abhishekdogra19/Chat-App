import React, { useState } from "react";
("use client");
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CiMail } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "../ui/PasswordInput";
import { Label } from "../ui/label";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(5).max(20),
    confirmPassword: z.string().min(5).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState<string>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const postImg = async (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList[];
    };
    const pics = target.files[0];
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image!",
        variant: "destructive",
      });
      return;
    }
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/jpg" ||
      pics.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "abhicode");
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/abhicode/image/upload",
          data
        );
        toast({
          description: "Image successfully uploaded",
        });
        setPic(response.data?.url.toString());
      } catch (error) {
        console.log("Error While uploading image: ", error);
      }
    } else {
      toast({
        title: "Please select a valid image!",
        variant: "destructive",
      });
    }
    setLoading(false);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { username, email, password } = values;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user",
        {
          name: username,
          email,
          password,
          pic,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      toast({
        title: "Success",
        description: "Please Wait...",
      });
      setTimeout(() => {
        navigate("/chats");
      }, 1000);
    } catch (error) {
      console.log("Error in formSubmit, ", error);
    }
    setLoading(false);
  }
  return (
    <div className="px-4 py-1 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} placeholder="Confirm Password" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full   items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              className="text-center"
              onChange={(e) => postImg(e)}
            />
          </div>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
