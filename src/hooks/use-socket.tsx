import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const serverUrl = import.meta.env.VITE_API_DOMAIN || "http://localhost:1337";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>();
  // console.log(serverUrl)
  useEffect(() => {
    const newSocket = io(serverUrl, {
      reconnectionAttempts: 5, // Retry 5 times
      reconnectionDelay: 2000, // Wait 2 seconds before each retry
      transports: ["websocket"],
    });
    console.log(newSocket,socket)
    setSocket(newSocket);

    //pinging to server
    const pingInterval = setInterval(() => {
      if (newSocket.connected) {
        console.log(`Connected`)
        newSocket.emit("ping");
      }
    }, 5000);

    newSocket.on("connect", () => {
      console.log("Connected to Socket.io ", serverUrl);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server ", serverUrl);
    });

    return () => {
      newSocket.disconnect();
      clearInterval(pingInterval);
    };
  }, []);
   console.log(socket)
  return socket;
};

export default useSocket;
