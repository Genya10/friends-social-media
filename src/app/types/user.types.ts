

export interface IUser {
    id: number
    username: string,
    email: string,
    confirmed: boolean,
    role: string,
    avatar: {
        url:string
    }
}

export type UserJwt = {
    user:IUser
    jwt:string
}

