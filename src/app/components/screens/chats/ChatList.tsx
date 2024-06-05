"use client";

import { Field } from "../ui/field/Field";
import { Search } from "lucide-react";
import { $fetch } from "@/api/api.fetch";
import { IChat } from "../../../types/chat.types";
import { useQuery } from "@tanstack/react-query";
import { ChatListItem } from "./list/ChatListItem";
import { Loader } from "../ui/loader/Loader";
import { IUser } from "@/app/types/user.types";
import { IResponsiveChats } from "@/app/types/chat.types";
import { useAuth } from "@/app/hooks/useAuth";

export default function ChatList() {
  const { user, isLoggedIn } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () =>
      $fetch.get<{ data: IResponsiveChats[] }>(
        `/chats?sort=createAt:desc&populate[messages]
          =*&populate[participants]=*&filters[participants][email][$eq]=${user?.email}`,
        true
      ),
    enabled: isLoggedIn,
  });
  console.log(data);

  return (
    <div>
      <div className="border-t border-b border-border p-layout">
        <Field placeholder="Search chats" Icon={Search} />
      </div>
      <div>
        {isLoading ? (
          <div className="p-layout">
            <Loader />
          </div>
        ) : data?.data.length ? (
          data?.data.map(({ id, attributes: chat }) => {
            console.log("chat", chat);
            return <ChatListItem key={chat.id} data={chat} />;
          })
        ) : (
          <p className="p-layout">Chats not found!</p>
        )}
      </div>
    </div>
  );
}
