"use client";

import { $fetch } from "@/api/api.fetch";
import { IUser } from "../types/user.types";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../components/screens/ui/loader/Loader";
import Image from "next/image";
import { getImageUrl } from "../config/get-image-url.config";
import { useProfile } from "../hooks/useProfile";

export function Friends() {
  const { data: authUser, refetch: refetchProfile } = useProfile();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => $fetch.get<IUser[]>("/users?populate=avatar", true),
  });

  return (
    <div className="w-7/12">
      <h1 className="p-layout border-r border-b border-border">People</h1>
      {isLoading || isFetching ? (
        <div className="p-layout">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-3">
          {data?.map(user => {
            const isFriends = authUser?.friends?.some((u) => u.id === user.id);

            return (
              <div
                key={user.id}
                className="text-center border border-l-0 border-t-0 border-border p-layout"
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
                <button
                  className=
                  "border-b border-white transition-colors hover:border-primary hover:text-primary cursor-pointer mt-2"
                >
                  {isFriends ? "Remove from friends" : "Add to friend"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

  /*const { mutate: addFriend } = useMutation({
    mutationKey: ["add friend"],
    mutationFn: (friend: IUser) =>
      $fetch
        .put(
          `/users/${authUser?.id}
    `,
          {
            data: {
              friends: [
                ...(authUser?.friends.map(({ id }) => id) || []),
                friend.id,
              ],
            },
          },
          true
        )
        .then(() =>
          $fetch.put(
            `/users/${authUser?.id}`,
            {
              data: {
                friends: [
                  ...(authUser?.friends.map(({ id }) => id) || []),
                  friend.id,
                ],
              },
            },
            true
          )
        ),
    onSuccess: () => {
      refetchProfile();
      refetch();
      toast.success("Friend succesfully added");
    },
  });*/