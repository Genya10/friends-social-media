'use client';

import { ArrowRightToLine, Send } from "lucide-react"
import { Field } from "../../ui/field/Field"
import { IMessageField } from "./messages.types"
import { useState } from "react";
import { useReactQuerySocket} from '../../../../hooks/useReactQuerySocket';
import { useParams } from "next/navigation";

export function MessageField({sendMessage} : IMessageField){

   const [message, setMessage] = useState('');
   const send = useReactQuerySocket();
   const {id} = useParams();

   const onSubmit = () => {
    if(!message) return

    send({
     operation:'invalidate',
     entity:'chat',
     id: id.toString(),
     payload : {title: "My 5th post"}
    })
   }

    return (
        <div className="border-t border-border p-layout
                    flex-items-center justify-between">
            <Field placeholder="Write a message ..."
                   Icon={ArrowRightToLine}
                   value={message}  
                   onChange={e => setMessage(e.target.value)}
                   className='w-4/5'
            />
            <button onClick={onSubmit} disabled={!message}
                className='hover:text-primary transition-colors'>
               <Send/> 
            </button>
        </div>
    )
}