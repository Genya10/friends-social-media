import { IStrapiResponsive } from './chat.types';

export interface IUser {
    username: string,
    email: string,
    confirmed: boolean,
    role: string,
    avatar: {
        data: IStrapiResponsive<{url:string}>
    }
}

export type UserJwt = {
    user:IUser
    jwt:string
}

