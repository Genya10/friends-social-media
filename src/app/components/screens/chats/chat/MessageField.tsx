'use client';

import { ArrowRightToLine } from "lucide-react"
import { Field } from "../../ui/field/Field"
import { IMessageField } from "./messages.types"
import { useState } from "react";

export function MessageField({sendMessage}:IMessageField){

   const [message, setMessage] = useState('');

   const onSubmit = () => {
     message && sendMessage(message)
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
              {/* <Send/> */}
            </button>
        </div>
    )
}