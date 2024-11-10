"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import Field from "./Field";
import axios from "axios";
import { setToken } from "@/lib/auth";
import { addChat } from "@/lib/db";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-provider";
import { nanoid } from "nanoid";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  identifier: z.string().min(2, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export function LoginForm() {
  const navigate = useNavigate();
  const { handleUser, user } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
   const {toast} = useToast()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const API_DOMAIN = import.meta.env.VITE_ENVIRONMENT == 'production' ? import.meta.env.VITE_API_DOMAIN : 'http://localhost:1337'
    // try {
    console.log(API_DOMAIN, import.meta.env)
      const { data }  = await axios
        .post(`${API_DOMAIN}/api/auth/local`, {
          identifier: values.identifier,
          password: values.password,
        })
        .then((data) => data)
        .catch((err)=>{
          toast({
            // title`
            variant: "destructive",
            // title: "Uh oh! Something went wrong.",
            title:err.response.data.error.message,

          })
          return err.response.data.error.message
        })
      setToken(data.jwt);
      if (data.jwt) {
        // const id = nanoid()
        // const db =  await initDB(STORE_NAME)
        handleUser({
          username: data.user.username,
          email: data.user.email,
        });
      }
      const id = nanoid();
      addChat(id);
      // console.log(db.objectStoreNames)
      navigate(`/chat/${id}`);
    
    // .catch((error)=>{console.log(error)})

   
  }

  if (user) {
    const id = nanoid();
    addChat(id);
    // console.log(db.objectStoreNames)
    navigate(`/chat/${id}`);
  }
  return (
    <Card className="w-[350px] sm:w-[400px] text-left">
      <CardHeader>
        <CardTitle className="text-xl">Log in</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Field name="identifier" type="email" label="Email" desc={""} />
            <Field
              name="password"
              type="password"
              label="Password"
              desc={"Password must have 8 letters"}
            />

            <Button title="Title" type="submit">
              Log in
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
       
      </CardFooter>
    </Card>
  
  );
}
