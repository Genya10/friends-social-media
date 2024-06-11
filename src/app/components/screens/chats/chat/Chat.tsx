"use client";

import { $fetch } from "@/api/api.fetch";
import { useAuth } from "@/app/hooks/useAuth";
import { IChat } from "@/app/types/chat.types";
import { useQuery } from "@tanstack/react-query";
import { Message } from "./Message";
import { MessageField } from "./MessageField";
import { ChatHeader } from "./ChatHeader";
import { Loader } from "lucide-react";

export default function Chat({ id }: { id: string }) {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
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

  const correspondent = data?.participants.find((u) => u.email !== user?.email);

  return (
    <div
      className="w-8/12 border-r border-border h-full grid"
      style={{
        gridTemplateRows: isLoading ? "1fr .08fr" : ".6fr 6fr 6fr",
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          { correspondent && <ChatHeader correspondent={correspondent} />}
          <div className="p-layout border-t border-border">
            {data?.messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        </>
      )}
      <MessageField />
    </div>
  );
}
