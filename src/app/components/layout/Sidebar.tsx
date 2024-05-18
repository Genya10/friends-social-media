import Image from "next/image";
import { Sun, User2, Phone, MessageSquare, Settings } from "lucide-react";
import cl from "./Sidebar.module.scss";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className={cl.sidebar}>
      <Image src="/linear-icon.svg" alt="" width={50} height={50} />
      <div>
        <Link href="/friends">
          <User2 />
        </Link>
        <Link href="/call">
          <Phone />
        </Link>
        <Link href="/chats">
          <MessageSquare />
        </Link>
        <Link href="/settings">
          <Settings />
        </Link>
      </div>
      <Sun />
    </aside>
  );
}
