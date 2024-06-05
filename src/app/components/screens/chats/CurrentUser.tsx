'use client'

import { useAuth } from "@/app/hooks/useAuth";
import Image from 'next/image';

export default function CurrentUser(){
    const { user } = useAuth()

    return(
        <div className="p-layout flex item-center">
         <div className="flex item-center">
            <Image src={user?.avatar || '/no-avatar.png'}
                   alt={user?.email || ''}
                   width={50}
                   height={50}
                   className='mr-4'
                />
                <div className="text-sm">
                  <div>{user?.username}</div>
                  <div className="opacity-40">UI/UX Desigh</div>
                </div>        
         </div>
        </div>
    )
}