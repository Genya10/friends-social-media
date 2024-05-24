'use client';

import { Field } from "../ui/field/Field";
import { AtSign, KeyRound } from "lucide-react";
import { Button } from "../ui/button/Button";

interface IAuth {
    type?:'login'|'register'
}

export function Auth({type}:IAuth){
    return(
        <div>
            <form>
                <Field placeholder="Enter email:" Icon={AtSign}/>
                <Field placeholder="Enter password:" Icon={KeyRound}/>

                <Button isLoading={true}>{type}</Button>
            </form>
        </div>
    )
}