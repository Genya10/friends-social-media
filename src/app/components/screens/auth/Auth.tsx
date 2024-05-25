"use client";

import { Field } from "../ui/field/Field";
import { AtSign, KeyRound } from "lucide-react";
import { Button } from "../ui/button/Button";

interface IAuth {
  type?: "Login" | "Register";
}

export function Auth({ type }: IAuth) {
  return (
    <div className="flex w-screen h-full">
      <form className="m-auto block w-96 border border-border p-layout">
        <h1 className="text-center mb-10">{type}</h1>
        <Field
          placeholder="Enter email:"
          type="email"
          Icon={AtSign}
          className="mb-7"
        />
        <Field
          placeholder="Enter password:"
          type="email"
          Icon={KeyRound}
          className="mb-12"
          //error={{message:'Wrong password', type:'min'}}
        />
        <div className="text-center">
          <Button >{type}</Button>
        </div>
      </form>
    </div>
  );
}
