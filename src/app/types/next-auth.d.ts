import { DefaultSession } from 'next-auth';

declare module 'next-auth'{
    interface Session {
        jwt: string
        user:{
            email:string
            username:string
            avatar:string
        }
    }
}