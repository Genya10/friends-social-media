import type { PropsWithChildren } from 'react';
import { Sidebar } from './sidebar/Sidebar';
import cl from './LayoutClient.module.scss';

export default function LayoutClient({children}:PropsWithChildren<unknown>){

    return (
           <main className={cl.layout}>
            <Sidebar/>
             <section>{children}</section> 
           </main> 
    )        
}