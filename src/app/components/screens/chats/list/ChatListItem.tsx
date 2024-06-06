"use client";

import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import { IStrapiChat } from "../../../../types/chat.types";
import dayjs from "dayjs";
import Link from "next/link";
import { getImageUrl } from "@/app/config/get-image-url.config";

interface IChatListItem {
  id: number;
  data: IStrapiChat;
}

export function ChatListItem({ data: chat, id }: IChatListItem) {
  const { user } = useAuth();

  const correspondent = chat.participants.data.find(
    (us) => us.attributes.email !== user?.email
  );
  const lastMessage = chat.messages.data.at(-1);

  return (
    <Link
      href={`/chat/${id}`}
      className="p-layout flex item-center border-b border-border
                duration-300 ease-linear transition-colors hover:bg-border"
    >
      <Image
        src={
          getImageUrl(correspondent?.attributes.avatar.data.attributes.url)
             || "/no-avatar.png"}
        alt={correspondent?.attributes.email || ""}
        width={45}
        height={45}
        className="mr-4"
      />
      <div className="text-sm">
        <div className="flex items-center">
          <span>{correspondent?.attributes.username}</span>
          <span className="text-xs opacity-30">
            {dayjs(lastMessage?.attributes.createAt).format("HH:mm")}
          </span>
        </div>
        <div className="opacity-30 mt-0.5">{lastMessage?.attributes.text}</div>
      </div>
    </Link>
  );
}
