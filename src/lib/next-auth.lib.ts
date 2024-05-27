import { IAuthFormState } from "@/app/components/screens/auth/auth.types";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { $fetch } from "@/api/api.fetch";
import { IUser } from "@/types/user.types";

export default NextAuth ({
    providers:[
        Credentials({
            name:'Credentials',
            credentials:{
                email:{
                    type:'text',
                },
                password:{type:'password'}
            },

           async authorize(credentials){
              const {email, password} = credentials as IAuthFormState;

            const data = await $fetch.get<IUser[]>(`/users?filters[email][$eq]=${email}`)
             console.log(data)
            return
               
            },
        }),
    ],
    callbacks:{
    }
})