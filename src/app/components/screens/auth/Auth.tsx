"use client";

import { Field } from "../ui/field/Field";
import { AtSign, KeyRound } from "lucide-react";
import { Button } from "../ui/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthFormState } from "./auth.types";
import { signIn } from "next-auth/react";
import { getRandomFullName } from "@/app/utils/get-random-full-name.util";

interface IAuth {
  type?: "Login" | "Register";
}

export function Auth({ type }: IAuth) {
  const { register } = useForm<IAuthFormState>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IAuthFormState> = async (data) => {
    try {
      if (type === "Login") {
        const result = await signIn("credentials", {
          redirect: false,
          ...data,
        });
      } else {
        await signIn("credentials", {
          redirect: false,
          username: getRandomFullName(),
          ...data,
        });
      }
    } catch (error) {
      console.log((error as TypeError).message);
    }
  };

  return (
    <div className="flex w-screen h-full">
      <form className="m-auto block w-96 border border-border p-8">
        <h1 className="text-center mb-10">{type}</h1>
        <Field
          {...register("email", {
            required: true,
          })}
          placeholder="Enter email:"
          type="email"
          Icon={AtSign}
          className="mb-7"
        />
        <Field
          {...register("password", {
            required: true,
            minLength: {
              value: 6,
              message: "Min lenght 6 symbols!",
            },
          })}
          placeholder="Enter password:"
          type="password"
          Icon={KeyRound}
          className="mb-12"
          //error={{message:'Wrong password', type:'min'}}
        />
        <div className="text-center">
          <Button type="submit">{type}</Button>
        </div>
      </form>
    </div>
  );
}
