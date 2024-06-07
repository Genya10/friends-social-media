import type { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/app/constants/seo.constants";
import { ChatsScreen } from "@/app/components/screens/chats/ChatsScreen";

export const metadata: Metadata = {
    title:'Chat',
    ...NO_INDEX_PAGE
}

export default function ChatPage(){
    return <ChatsScreen>
        Here will bold chat
    </ChatsScreen>
}