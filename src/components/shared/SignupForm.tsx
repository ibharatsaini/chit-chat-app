"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { addChat   } from "@/lib/db";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-provider";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }).email(),
  username: z.string().min(2, {
    message: "Username is required.",
  }).max(15),
  password: z.string().min(8, {
    message: "Password required 8 letters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Confirm Password.",
  }),
});

export function SignupForm() {
  const {toast} = useToast()
  const navigate = useNavigate()
  const {handleUser, user} = useAuth()
  console.log(import.meta.env)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const {confirmPassword, password, username,email} = values
    if(confirmPassword !== password){
      toast({
        // title`
        variant: "destructive",
        // title: "Uh oh! Something went wrong.",
        title:`Password do not match`,

      })
      return
    }
    const API_DOMAIN = import.meta.env.VITE_ENVIRONMENT == 'production' ? import.meta.env.VITE_API_DOMAIN : 'http://localhost:1337'
    console.log(API_DOMAIN)
    const {data} = await  axios.post(`${API_DOMAIN}/api/auth/local/register`, {
     email,
     username,
     password
    }).then(data=>data).catch(err=>{
      toast({
        // title`
        variant: "destructive",
        // title: "Uh oh! Something went wrong.",
        title:err.response.data.error.message,

      })
      return err.response.data.error.message
    })
    console.log(data.jwt)
    setToken(data.jwt)
    if(data.jwt){
      // const id = nanoid()
      // const db =  await initDB(STORE_NAME)
      handleUser({
        username:data.user.username,
        email:data.user.email
      })
      const id = nanoid()
      addChat(id)
      // console.log(db.objectStoreNames)
      navigate(`/chat/${id}`)
    }
  }

  
  return (
    <Card className="w-[350px] sm:w-[400px] text-left">
      <CardHeader>
        <CardTitle className="text-xl">Create account</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Field name="email" type="email" label="Email" desc={""} />
            <Field name="username" label="Username" desc={""} />
            <Field
              name="password"
              type="password"
              label="Password"
              desc={"Password must have 8 letters"}
            />
            <Field
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              desc={"Re-enter password."}
            />
            <Button title="Title" type="submit">
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button> */}
      </CardFooter>
    </Card>
  );
}
