import { Loader2 } from "lucide-react";
import cl from './Loader.module.scss'

export function Loader(){
    return <Loader2 className={cl.loader}/>
}