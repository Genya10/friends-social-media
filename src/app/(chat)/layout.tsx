import {type PropsWithChildren} from "react";
import CurrentUser from "../components/screens/chats/CurrentUser";
import ChatList from "../components/screens/chats/list/ChatList";

export default function ChatLayout({children}:
    PropsWithChildren<unknown>){

        return (
            <div className="grid h-full"
            style={{
                gridTemplateColumns:'.7fr 3 fr'
            }}>
             <div className="border-r border-border">
              <CurrentUser/>
              <ChatList/>
             </div>
             <div>{children}</div>
            </div>
        )
    }