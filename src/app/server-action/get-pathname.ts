'use server';

import { headers } from "next/headers";

export const getServerPathname =()=>{
    const headerList = headers();
    const headerUrl = headerList.get('referer');
    const currentPathname = '/'+ headerUrl?.split('/').slice(3).join('/')

    return currentPathname;
}