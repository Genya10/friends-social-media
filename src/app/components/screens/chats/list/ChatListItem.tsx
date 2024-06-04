'use client';

import { useAuth } from '@/app/hooks/useAuth';
import {IChat} from '../../../../types/chat.types';
import {IUser} from '../../../../types/user.types';
import Image from 'next/image';

export function ChatListItem({participants, messages}:IChat){
    const {user} = useAuth()
    const correspondent = participants.find(us => us.email !== user?.email)
    const lastMessage = messages.at(-1)

    return (
    <div className="p-layout flex item-center">
      <Image src={correspondent?.avatar || '/no-avatar.png'}
             alt={correspondent?.email || ''}
             width={45}
             height={45}
             className='mr-4'
        />
        <div className="text-sm">
            <div>
                <span>{correspondent?.username}</span>
                <span>{lastMessage?.createAt}</span>
            </div>
          <div className="opacity-30">{lastMessage?.text}</div>
        </div>        
   </div>
    )
}