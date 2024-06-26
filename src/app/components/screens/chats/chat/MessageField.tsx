"use client";

import { ArrowRightToLine, Send } from "lucide-react";
import { Field } from "../../ui/field/Field";
import { useState } from "react";
import { useReactQuerySocket } from "../../../../hooks/useReactQuerySocket";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { $fetch } from "@/api/api.fetch";

export function MessageField() {
  const [message, setMessage] = useState("");
  const send = useReactQuerySocket();
  const { id } = useParams();
  const { user } = useAuth();

  const { mutate } = useMutation({
    mutationKey: ["update chat", id],
    mutationFn: () =>
      $fetch.post("/messages", {
        data: {
          text: message,
          sender: Number(user?.id),
          chat: id
        },
      }, 
      true ),
    onSuccess() {
      setMessage('')
      send({
        operation: "update",
        entity: "chat",
        id: id.toString(),
      });
    },
  });

  const onSubmit = () => {
    if (!message) return
    mutate()
  };

  return (
    <div
      className="border-t border-border p-layout
                    flex items-center justify-between"
    >
      <Field
        placeholder="Write a message ..."
        Icon={ArrowRightToLine}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={e=>{
          if(e.key === 'Enter') onSubmit()
        }}
        className="w-4/5"
      />
      <button
        onClick={onSubmit}
        disabled={!message}
        className="hover:text-primary transition-colors"
      >
        <Send />
      </button>
    </div>
  );
}
