'use client'

import { useAuth } from "../hooks/useAuth";
import { useEffect, type PropsWithChildren } from "react";

export default function AuthProvider({children}: 
    PropsWithChildren<unknown>){
        const {user, isLoggedIn} = useAuth()

        useEffect(()=>{
          if(isLoggedIn){
            window.localStorage.setItem('token', user?.jwt || '')
          }
        },[user,isLoggedIn])

        return <>{children}</>
    }