import { IAuthFormState } from "@/app/components/screens/auth/auth.types";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { $fetch } from "@/api/api.fetch";
import { IUser } from "@/types/user.types";

export default NextAuth ({
    providers: [
        Credentials({
            credentials: { username:{
             type:'text',
            },
                email: {
                    type:'text',
                },
                password:{ type:'password' }
            },

           async authorize(credentials){
            //const {email, password} = credentials as IAuthFormState;

            if(!credentials?.email || !credentials.password) return null

            if(credentials.username){
             return null
            }

            const data = await $fetch.post<{user:IUser, jwt:string}>(
               `/auth/local`
             )

            /*const data = await $fetch.get<IUser[]>(
                `/users?filters[email][$eq]=${credentials?.email}`)*/

            console.log(data)
            return null              
            },
        }),
    ],
    callbacks:{
        session({session, token, user}){
            return session
        }
    }
})