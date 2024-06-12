"use client";

import { $fetch } from "@/api/api.fetch";
import { IUser } from "../types/user.types";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../components/screens/ui/loader/Loader";
import Image from "next/image";
import { getImageUrl } from "../config/get-image-url.config";
import cn from "clsx";

export function Friends() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: () => $fetch.get<IUser[]>("/users?populate=avatar", true),
  });

  return (
    <div className="w-7/12 border-b border-border">
      <h1 className="p-layout border-r border-b border-border">People</h1>
      {isLoading || isFetching ? (
        <div className="p-layout">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-3">
          {data?.map((user, index) => (
            <div
              key={user.id}
              className={cn(
                "text-center border border-t-0 border-border p-layout",
                { "border-l-0": index % 3 === 0 }
              )}
            >
              <Image
                src={getImageUrl(user.avatar?.url) || "/no-avatar.png"}
                alt={user.username}
                width={100}
                height={100}
                priority
                className="mx-auto"
              />
              <div className="mt-3 text-xl font-medium">{user.username}</div>
              <button className=
                "border-b border-white transition-colors hover:border-primary hover:text-primary cursor-pointer mt-2">
                Add to friend
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
