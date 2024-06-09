import type { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/app/constants/seo.constants";
import Chat from "@/app/components/screens/chats/chat/Chat";

export const metadata: Metadata = {
  title: "Chat",
  ...NO_INDEX_PAGE,
};

export default function ChatPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <Chat id={params.id} />
      <p>Here will bold chat</p>
    </div>
  );
}
