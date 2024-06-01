import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { $fetch } from "@/api/api.fetch";
import { UserJwt } from "@/app/types/user.types";
import { User } from "../types/next-auth";

export default NextAuth({
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
            const data = await $fetch.post<UserJwt>(
              `/auth/local/register`,
               //credentials
            );
   
           return {
            id:data.user.email,
            email:data.user.email,
            avatar:data.user.avatar,
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
          // Если имя пользователя не предоставлено, выполняется логин
          const data = await $fetch.post<UserJwt>(
            `/auth/local`,
             /*{
            identifier:credentials.email,
            password:credentials.password
          }*/
          )

         return {
          id:data.user.email,
          email:data.user.email,
          avatar:data.user.avatar,
          username:data.user.username,
          jwt:data.jwt
         } as User
        } catch (e) {
          return Promise.reject({
            message: "Login error,not valid data",
          });
        }
      },
    }),
  ],
  callbacks: {
    // Колбэк для управления сессией
    jwt({token,user,account}){
      return {...token,...user}
    },
    session({ session, token, user }) {
      console.log(session, token, user)
      return session;
    },
  },
});


