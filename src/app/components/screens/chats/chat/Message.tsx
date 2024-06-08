import { IMessage } from "@/app/types/chat.types";
import Image from "next/image";
import { useAuth } from "@/app/hooks/useAuth";
import dayjs from "dayjs";

export function Message({ message }: { message: IMessage }) {
  const { user } = useAuth();
  const isSender = user?.email === message.sender.email;

  return (
    <div
      className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2.5`}
    >
      <div
        className={`relative flex items-center ${
          isSender ? "flex-row-reverse" : ""
        }`}
      >
        <Image
          src={message.sender.avatar.url}
          alt="Avatar"
          className="rounded-full"
          width={45}
          height={45}
        />
        <div
          className={`bg-gray-200 p-2 rounded-lg ${isSender ? "mr-3" : "ml-3"}`}
        >
          <p className="text-sm text-gray-800">{message.text}</p>
          <span className="text-xs text-gray-500 block mt-1">
            {dayjs(message.createAt).format("HH:mm")}
          </span>
        </div>
      </div>
    </div>
  );
}
