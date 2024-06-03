'use client'

import { useAuth } from "../hooks/useAuth";
import { useEffect, type PropsWithChildren } from "react";
import { usePathname, useRouter  } from "next/navigation";

export default function AuthProvider({children}: 
    PropsWithChildren<unknown>){
        const {user, isLoggedIn} = useAuth()
        const pathname = usePathname()
        const router = useRouter()

        useEffect(()=>{
          if(isLoggedIn){
            window.localStorage.setItem('token', user?.jwt || '')
          }
        },[user,isLoggedIn])

        useEffect(()=>{
            if(pathname !== '/login' && pathname !== '/register'){
              const isLoggedIn = !!window.localStorage.getItem('token')
              //if(!isLoggedIn) return router.push('/login')
            }
        },[pathname,isLoggedIn])

        return <>{children}</>
    }