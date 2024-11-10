import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Profile from "./shared/Profile";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { nanoid } from "nanoid";
import { addChat } from "@/lib/db";
import { useNavigate, useParams } from "react-router-dom";

interface RecentChat {
  key: string;
  chat: string;
}
export function AppSidebar() {
  const [recentChat, setRecentChat] = useState<RecentChat[] | null>([]);
  const { chatId } = useParams();
  const navigate = useNavigate();
  function handleAddChat() {
    const id = nanoid();
    addChat(id);
    setRecentChat((prev) => {
      if (prev) return [{ key: id, chat: `New chat` }, ...prev];
      return [{ key: id, chat: `New Chat` }];
    });
    return navigate(`/chat/${id}`);
  }

  useEffect(() => {
    const chats: RecentChat[] = [];
    if (!chatId) return;
    // console.log(localStorage.key(i))
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      // const
      const chat = localStorage.getItem(key);
      if (!chat) return;
      // if(key == chatId) console.log(key,chat,JSON.parse(chat)[0].text )

      try {
        if (JSON.parse(chat).length > 0) {
          const parsedChat = JSON.parse(chat)[0].text;
          chats.push({ key, chat: parsedChat });
        } else {
        //   chats.splice(0, 0, { key, chat: `New Chat` });
        }
      } catch (e) {
        continue;
      }
    }

    setRecentChat(() => [...chats]);
  }, []);
  return (
    <Sidebar className="">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#9FADBC]">
            Recent chats
            <Plus onClick={handleAddChat} className="ml-auto cursor-pointer" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentChat &&
                recentChat.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      isActive={item.key == chatId ? true : false}
                      asChild
                    >
                      <a className="text-[#9FADBC]" href={`/chat/${item.key}`}>
                        {/* <item.icon /> */}
                        <span className="text-base">{item.chat}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <SidebarGroup></SidebarGroup> */}
      </SidebarContent>
      <SidebarFooter>
        <Profile />
      </SidebarFooter>
    </Sidebar>
  );
}
