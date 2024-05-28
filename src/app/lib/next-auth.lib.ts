import { IAuthFormState } from "@/app/components/screens/auth/auth.types";
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

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        if (credentials.username) {
          const data = await $fetch.post<{ user: IUser; jwt: string }>(
            `/auth/local/register` //credentials
          );

          console.log("register", data);

          return null;
        }

        const data = await $fetch.post<{ user: IUser; jwt: string }>(
          `/auth/local`
        );
        return null;

        /*const data = await $fetch.get<IUser[]>(
                `/users?filters[email][$eq]=${credentials?.email}`)*/
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      return session;
    },
  },
});
