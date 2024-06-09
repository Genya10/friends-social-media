

export interface IUser {
    id: number
    username: string,
    email: string,
    confirmed: boolean,
    role: string,
    avatar: {
        url:string
    } | null
}

export type UserJwt = {
    user:IUser
    jwt:string
}

