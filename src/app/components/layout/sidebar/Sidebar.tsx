'use client'

import Image from "next/image";
import { Sun, User2, Phone, MessageSquare, Settings } from "lucide-react";
import cl from "./Sidebar.module.scss";
import Link from "next/link";
import { MENU } from "./sidebar.data";
import clsx from "clsx";

export function Sidebar() {
  return (
    <aside className={cl.sidebar}>
      <Image src="/linear-icon.svg" priority alt="image" width={50} height={50} />
      {MENU.map(item=>(
       <Link href={item.url} key={item.url}>
        <item.icon size={30}/>
       </Link>
      ))
    }

      {/*<div>
        <Link href="/friends">
          <User2 size={30}/>
        </Link>
        <Link href="/call">
          <Phone size={30}/>
        </Link>
        <Link href="/chats">
          <MessageSquare size={30}/>
        </Link>
        <Link href="/settings">
          <Settings size={30}/>
        </Link>
  </div>*/}
      <Sun />
    </aside>
  );
}
