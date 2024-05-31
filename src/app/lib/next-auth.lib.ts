import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { $fetch } from "@/api/api.fetch";
import { IUser } from "@/app/types/user.types";

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
            const data = await $fetch.post<{ user: IUser; jwt: string }>(
              `/auth/local/register`
              // credentials
            );
            console.log("register", data); // Логируем результат регистрации
            return null; // Возвращаем null после успешной регистрации
          } catch (e) {
            return Promise.reject({
              message: "Register error,not valid data", // Ошибка при регистрации
            });
          }
        }

        try {
          // Если имя пользователя не предоставлено, выполняется логин
          const data = await $fetch.post<{ user: IUser; jwt: string }>(
            `/auth/local`
            /* {
            identifier:credentials.email,
            password:credentials.password
          }*/
          );
          console.log("login", data);
          return null;
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
