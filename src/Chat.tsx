import { useEffect, useRef, useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { ChatAvatar, ServerAvatar } from "./components/shared/Avatars";
import { getMessages, saveMessage } from "./lib/db";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import useSocket from "./hooks/use-socket";

interface Messages {
  text: string;
  fromUser: boolean;
}

// const socket = io(import.meta.env.VITE_API_DOMAIN)

function Chat() {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [input, setInput] = useState("");
  const socket = useSocket();
  const { chatId } = useParams();
  const chatEndRef = useRef<any>(null);

  if (!chatId) return <></>;

  const loadMessages = async () => {
    const savedMessages = await getMessages(chatId);

    if (savedMessages) {
      setMessages(() => {
        return JSON.parse(savedMessages);
      });
    }
  };

  useEffect(() => {
    // console.log(getStore().then(d=>d))
    if (!socket) return;

    loadMessages();
    // Listen for messages from the server
    socket.on("message", async (serverMessage: string) => {
      setMessages((prevMessages: Messages[]) => [
        ...prevMessages,
        { text: serverMessage, fromUser: false },
      ]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  //on enter press send the message
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") handleSend();
  };

  const handleSend = async () => {
    if (!socket) return;
    if (input.trim()) {
      // Send message to the server
      socket.emit("message", input);

      // Display the user message in the chat
      setMessages((prevMessages: Messages[]) => [
        ...prevMessages,
        { text: input, fromUser: true },
      ]);

      setInput("");
    }
  };

  //On new chats load the messages
  useEffect(() => {
    loadMessages();
  }, [chatId]);

  //On new message update the view and local storage
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log(
        messages,chatId
    )
    messages.length > 0 && saveMessage(chatId, messages);
  }, [messages]);

  return (
    <div className="  w-full h-full flex  flex-col">
      <div className="w-full p-auto h-full flex flex-col gap-3 pb-auto max-h-[calc(100vh-80px)] overflow-auto">
        {messages.map((msg: Messages, index: number) => (
          <div
            key={index}
            className={`${"flex w-full px-2 sm:px-10  lg:p-0 mx-auto lg:w-[700px] xl:w-[900px]   flex-col"} ${
              index == 0 ? "mt-auto" : ""
            }`}
          >
            {msg.fromUser ? (
              <div className="flex flex-row ml-auto gap-2 mt-2">
                <motion.h3
                  className="px-2 py-1 break-words text-right  text-wrap max-w-[300px]  bg-zinc-800 rounded"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                  }}
                >
                  {msg.text}
                </motion.h3>
                <ChatAvatar />
              </div>
            ) : (
              <div className="flex flex-row mr-auto gap-2">
                <ServerAvatar />

                {/* <div className="px-2  bg-gradient-to-r from-sky-500 to-indigo-400 py-1 flex max-h-max bg-zinc-800 rounded">
                  {msg.text}
                </div> */}
                <motion.h3
                  className="px-2  break-words text-left bg-gradient-to-r from-sky-500 to-indigo-400 py-1 text-wrap max-w-[300px] bg-zinc-800 rounded"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                  }}
                >
                  {msg.text}
                </motion.h3>
              </div>
            )}
          </div>
        ))}
        <div className="h-10" ref={chatEndRef} />
      </div>
      <div className="flex w-full mt-auto gap-3 px-2 sm:px-10 lg:px-20 xl:px-40 sticky">
        <Input
          type="text"
          placeholder="Type here.."
          className="item-end mb-8"
          value={input}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}

export default Chat;
