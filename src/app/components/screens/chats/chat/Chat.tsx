"use client";

import { $fetch } from "@/api/api.fetch";
import { IChat } from "@/app/types/chat.types";
import { useQuery } from "@tanstack/react-query";
import { Message } from "./Message";
import { MessageField } from "./MessageField";

export default function Chat({ id }: { id: string }) {
  const { data } = useQuery({
    queryKey: ["chat", id],
    queryFn: () =>
      $fetch.get<{ data: IChat }>(
        `/chats/${id}?populate[messages]
       [populate][sender][populate][avatar]=*
       &populate[participants][populate][avatar]=*`,
        true
      ),
    select: (data) => data.data,
    enabled: !!id,
  });

  return (
    <div className="w-8/12 border-r border-border h-full">
      <div className="p-layout border-t border-border">
        {data?.messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/**@ts-ignore */}
      <MessageField />
    </div>
  );
}
