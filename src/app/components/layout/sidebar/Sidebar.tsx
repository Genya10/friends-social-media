"use client";

import Image from "next/image";
import { Sun, User2, Phone, MessageSquare, Settings } from "lucide-react";
import cl from "./Sidebar.module.scss";
import Link from "next/link";
import { MENU } from "./sidebar.data";
import cn from "clsx";
import { getServerPathname } from "@/app/server-action/get-pathname";

export function Sidebar() {
  const pathname = getServerPathname();

  return (
    <aside className={cl.sidebar}>
      <Image
        src="/linear-icon.svg"
        priority
        alt="image"
        width={50}
        height={50}
      />
      {MENU.map((item) => (
        <Link
          href={item.url}
          key={item.url}
          className={cn({
            [cl.active]: pathname === item.url,
          })}
        >
          <item.icon size={30} />
        </Link>
      ))}
      <Sun />
    </aside>
  );
}
