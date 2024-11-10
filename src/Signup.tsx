import React, { useEffect } from "react";
import { SignupForm } from "./components/shared/SignupForm";
import { MessageCircleMore } from "lucide-react";
import { nanoid } from "nanoid";
import { addChat } from "./lib/db";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth-provider";

function Signup() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const id = nanoid();
      addChat(id);
      navigate(`/chat/${id}`);
    }
  });

  return (
    <div className="w-full  h-screen flex flex-row">
      <div className="hidden md:flex flex-col  bg-zinc-900 w-full h-full px-6 py-6 justify-between items-start">
        <div className="flex gap-2">
          <MessageCircleMore className="w-10 h-8" />
          <h3 className="text-2xl">Chit Chat</h3>
        </div>
        <h2 className="text-3xl font-bold">Chit Chat</h2>
      </div>
      <div className="flex  m-auto  sm:w-full  md:px-10  xl:w-3/4 items-center flex-col justify-center">
        <SignupForm />
        <p className="text-base font-semibold">
          Already have an account? <a href="/login"> Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
