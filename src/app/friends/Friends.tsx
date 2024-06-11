"use client";

import { $fetch } from "@/api/api.fetch";
import { IUser } from "../types/user.types";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../components/screens/ui/loader/Loader";
import Image from "next/image";
import { getImageUrl } from "../config/get-image-url.config";

export function Friends() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: () => $fetch.get<IUser[]>("/users?populate=avatar", true),
  });

  return (
    <div className="w-7/12 border-b border-border">
      <h1 className="p-layout">People</h1>
      {isLoading || isFetching ? (
        <div className="p-layout">
          <Loader />
        </div>
      ) : (
        <div className="p-layout grid grid-cols-3">
          {data?.map((user) => (
            <div key={user.id}>
              <Image
                src={getImageUrl(user.avatar?.url) || "/no-avatar.png"}
                alt={user.username}
                width={80}
                height={80}
                priority
              />
              <div>{user.username}</div>
              <button>Add to friend</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
