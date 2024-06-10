"use client";

import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import { IStrapiChat } from "../../../../types/chat.types";
import dayjs from "dayjs";
import Link from "next/link";
import { getImageUrl } from "@/app/config/get-image-url.config";

interface IChatListItem {
  chat: IStrapiChat;
}

export function ChatListItem({ chat: chat, chat:id}: IChatListItem) {
  const { user } = useAuth();

  const correspondent = chat.participants.data.find(
    (us) => us.email !== user?.email
  );
  const lastMessage = chat.messages.data.at(-1);

  return (
    <Link
      href={`/chat/${id}`}
      className="p-layout flex item-center border-b border-border
                duration-300 ease-linear transition-colors 
                hover:bg-border hover:bg-border animation-slide-fade"
    >
      <Image
        src={
          getImageUrl(correspondent?.avatar?.url) || "/no-avatar.png"}           
          alt={correspondent?.email || ""}
          width={45}
          height={45}
          className="mr-4"
      />
      <div className="text-sm">
        <div className="flex items-center">
          <span>{correspondent?.username}</span>
          <span className="text-xs opacity-30">
            {dayjs(lastMessage?.createAt).format("HH:mm")}
          </span>
        </div>
        <div className="opacity-30 mt-0.5">{lastMessage?.text}</div>
      </div>
    </Link>
  );
}
