"use client";

import Image from "next/image";
import { Sun } from "lucide-react";
import cl from "./Sidebar.module.scss";
import Link from "next/link";
import { MENU } from "./sidebar.data";
import cn from "clsx";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

export function Sidebar() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  return (
    <aside className={cl.sidebar}>
      {isLoggedIn ? (
        <>
          <Image src="/logo.svg" priority alt="image" width={50} height={50} />
          <div>
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
          </div>
          <Sun size={30} />
        </>
      ) : null}
    </aside>
  );
}
