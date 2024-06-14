import Credentials from "next-auth/providers/credentials";
import { $fetch } from "@/api/api.fetch";
import { IUser } from "@/app/types/user.types";
import { AuthOptions, User } from "next-auth";

export const nextAuthOptions : AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        username: {
          type: "text",
        },
        email: {
          type: "text",
        },
        password: { type: "password" },
      },

      // Функция авторизации пользователя
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        if (credentials.username) {
          // Если предоставлено имя пользователя, выполняется регистрация
          try {
            const data = await $fetch.post<{
              user:IUser,jwt:string }>(
              `/auth/local/register?.populate[avatar]=*`,
               credentials
            );
   
           return {
            id:data.user.id.toString(),
            email:data.user.email,
            avatar:data.user.avatar?.url,
            username:data.user.username,
            jwt:data.jwt
           } as User
          } catch (e) {
            return Promise.reject({
              message: "Register error,not valid data", // Ошибка при регистрации
            });
          }
        }

        try {
            const data = await $fetch.post<{
            user:IUser, jwt:string }>(
            `/auth/local?populate[avatar]=*`, {             
            identifier:credentials.email,
            password:credentials.password
          })
          
         return {
            id:data.user.id.toString(),
            email:data.user.email,
            avatar:data.user.avatar?.url,
            username:data.user.username,
            jwt:data.jwt
         } as User
        } catch (e) {
          return Promise.reject({
            message: "Login error,not valid data",
          })
        }
      },
    }),
  ],
  callbacks: {
    // Колбэк для управления сессией
    jwt({token, user}){
      return {...token,...user}
    },
    session({ session, token, user }) {
      //session.user = token as User
      return session;
    },
  },
};
