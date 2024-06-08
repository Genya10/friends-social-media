"use client";

import { Field } from "../../ui/field/Field";
import { Search } from "lucide-react";
import { $fetch } from "@/api/api.fetch";
import { IStrapiChat } from "../../../../types/chat.types";
import { useQuery } from "@tanstack/react-query";
import { ChatListItem } from "./ChatListItem";
import { Loader } from "../../ui/loader/Loader";
import { useAuth } from "@/app/hooks/useAuth";
import { useState } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";

export default function ChatList() {
  const { user, isLoggedIn } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm)

  const { data, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: () =>
      $fetch.get<{ data: IStrapiChat[] }>(
        `/chats?sort=createAt:desc
        &populate[messages]=*
        &populate[participants][populate][avatar]=*
        &filters[participants][email][$eq]=${user?.email}
        &filters[participants][username][$contains]=${debouncedSearchTerm}
        &filters[messages][text][$contains]=${debouncedSearchTerm}`,
        true
      ),
    enabled: isLoggedIn,
  });
  console.log(data);

  return (
    <div>
      <div className="border-t border-b border-border p-layout">
        <Field placeholder="Search chats" Icon={Search} value=
        {searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
      </div>
      <div>
        {isLoading ? (
          <div className="p-layout">
            <Loader />
          </div>
        ) : data?.data.length ? (
          data?.data.map(chat => {
            console.log("chat", chat);
            return <ChatListItem key={chat.id} chat={chat} />;
          })
        ) : (
          <p className="p-layout">Chats not found!</p>
        )}
      </div>
    </div>
  );
}