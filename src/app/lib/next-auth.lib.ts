import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { $fetch } from "@/api/api.fetch";
import { IUser } from "@/app/types/user.types";
import { UserJwt } from "@/app/types/user.types";

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
      async authorize(credentials):Promise<UserJwt | null> {
        if (!credentials?.email || !credentials.password) return null;

        if (credentials.username) {
          // Если предоставлено имя пользователя, выполняется регистрация
          try {
            const {jwt,user} = await $fetch.post<UserJwt>(
              `/auth/local/register`,
               //credentials
            );
           // return {...user,jwt}; 
           return null
          } catch (e) {
            return Promise.reject({
              message: "Register error,not valid data", // Ошибка при регистрации
            });
          }
        }

        try {
          // Если имя пользователя не предоставлено, выполняется логин
          const {jwt,user} = await $fetch.post<UserJwt>(
            `/auth/local`,
             /*{
            identifier:credentials.email,
            password:credentials.password
          }*/
          );
         // return {...user,jwt};
         return null
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
    session({ session, token, user }) {
      return session;
    },
  },
});


