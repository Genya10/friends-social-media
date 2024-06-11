'use client'

import { useAuth } from "@/app/hooks/useAuth";
import { signOut } from "next-auth/react";
import Image from 'next/image';
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/app/hooks/useProfile";
import { Loader } from "../ui/loader/Loader";

export default function CurrentUser(){
    const { user } = useAuth()
    const {push} = useRouter()
    const { data, isLoading} = useProfile()

    return(
        <div className="p-layout flex item-center justify-between">
         <div className="flex item-center">
            {isLoading ? <Loader/>
            :  <Image 
                   src={data?.avatar?.url || '/no-avatar.png'}
                   alt={user?.email || ''}
                   width={50}
                   height={50}
                   className='mr-4'
                   priority
               />}

                <div className="text-sm">
                  <div>{user?.username}</div>
                  <div className="opacity-40">UI/UX Desigh</div>
                </div>        
         </div>
         <button onClick={()=> signOut({
            redirect: false
         }).then(()=>{
            window.localStorage.removeItem('token')
            push('/login')
         })} 
             className='text-[#7C7275] hover:text-white 
                        transition-colors ease-linear'>
            <LogOut/>
         </button>
        </div>
    )
}