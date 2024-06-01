import 'next-auth';

declare module 'next-auth'{
    interface Session {
        user?:User
    }
}

interface User {
    email?: string
    username?: string
    avatar?: string
    id?: stringjwt
    jwt?: string
}

declare module 'next-auth/jwt'{
    interface JWT {
        token: string
    }
}