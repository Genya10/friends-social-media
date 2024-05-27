import { IAuthFormState } from "@/app/components/screens/auth/auth.types";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const options ={
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
              const {email, password} = credentials as IAuthFormState


            }
        })
    ],
}