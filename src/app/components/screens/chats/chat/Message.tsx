import { IMessage } from "@/app/types/chat.types";
import Image from "next/image";
import { useAuth } from "@/app/hooks/useAuth";
import dayjs from "dayjs";
import { getImageUrl } from "@/app/config/get-image-url.config";

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
          src={getImageUrl(message.sender.avatar?.url) || "/no-avatar.png"}
          alt="Avatar"
          className="rounded-full"
          width={45}
          height={45}
        />
        <div className={isSender ? "mr-3" : "ml-3"}>
          <div
            className={`text-sm text-white py-1 mt-4 px-3 rounded-2xl ${
              isSender
                ? "rounded-tr-none bg-primary"
                : "rounded-tl-none bg-border"
            }`}
          >
            {message.text}
          </div>
          <div className="text-xs opacity-30 block mt-1">
            {dayjs(message.createAt).format("HH:mm")}
          </div>
        </div>
      </div>
    </div>
  );
}
