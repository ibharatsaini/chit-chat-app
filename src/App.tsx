import "./App.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth-provider";
import { useEffect } from "react";


function App() {
  const navigate = useNavigate();

  const { user, loadingUser } = useAuth();
  console.log(user);
  useEffect(() => {
    if (!loadingUser && !user) navigate(`/login`);
  }, []);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="ml-1 h-8 w-8 mt-1" />

        <main className="flex justify-center w-full">
          <Chat />
        </main>
      </SidebarProvider>

    </>
  );
}

export default App;
