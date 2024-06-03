"use client";

import { Field } from "../ui/field/Field";
import { AtSign, KeyRound } from "lucide-react";
import { Button } from "../ui/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthFormState } from "./auth.types";
import { signIn } from "next-auth/react";
import { getRandomFullName } from "@/app/utils/get-random-full-name.util";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface IAuth {
  type?: "Login" | "Register";
}

// Компонент Auth для отображения формы аутентификации
export function Auth({ type }: IAuth) {
  const [isLoading, setIsLoading] = useState(false)
  // Использование хука useForm для управления состоянием формы
  const { register, handleSubmit } = useForm<IAuthFormState>({
    mode: "onChange",
  });

  const {push} = useRouter()
  //const {data:{user}} = useSession()

  const onSubmit: SubmitHandler<IAuthFormState> = async (data) => {
    setIsLoading(true)
    // Вызов функции signIn для аутентификации пользователя
    const response = await signIn(
      "credentials",
      type === "Login"
        ? {
            redirect: false,
            ...data, // Передача данных формы при логине
          }
        : {
            redirect: false,
            username: getRandomFullName(),
            ...data, // Передача данных формы при регистрации
          }
    );
    // Проверка на наличие ошибок в ответе
    if (response?.error) {
      toast.error(response.error);
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    push('/')
  };

  

  // Рендеринг формы аутентификации
  return (
    <div className="flex w-screen h-full">
      <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto block w-96 border border-border p-8">
        <h1 className="text-center mb-10">{type}</h1>
        <Field
          {...register("email", {
            required: true, // Поле email является обязательным
          })}
          placeholder="Enter email:"
          type="email"
          Icon={AtSign}
          className="mb-7"
        />
        <Field
          {...register("password", {
            required: true, // Поле password является обязательным
            minLength: {
              value: 6,
              message: "Min lenght 6 symbols!",
            },
          })}
          placeholder="Enter password:"
          type="password"
          Icon={KeyRound}
          className="mb-12"
        />
        <div className="text-center">
          <Button isLoading={isLoading} disabled={isLoading} type="submit">{type}</Button>
        </div>
      </form>
    </div>
  );
}
