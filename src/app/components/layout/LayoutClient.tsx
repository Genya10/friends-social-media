import type { PropsWithChildren } from 'react';
import { Sidebar } from './sidebar/Sidebar';
import cl from './LayoutClient.module.scss';
import {Toaster} from 'react-hot-toast'

export default function LayoutClient({children}:PropsWithChildren<unknown>){

    return (
           <main className={cl.layout}>
            <Sidebar/>
             <section>{children}</section> 
             <Toaster position='top-right'/>
           </main> 
    )        
}