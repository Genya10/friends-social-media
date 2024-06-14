import { InputHTMLAttributes } from "react";
import { Loader } from "../loader/Loader";
import cl from "./Button.module.scss";

interface IButton extends InputHTMLAttributes<HTMLButtonElement>{
 isLoading?:boolean
}

export function Button ({isLoading, children}:IButton){
    return (
        <button className={cl.button}>
            {isLoading ? <Loader/> : children}
        </button>
    )
}