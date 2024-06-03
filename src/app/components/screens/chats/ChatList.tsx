import { Field } from "../ui/field/Field";
import { Search } from 'lucide-react';

export default function ChatList(){
    return(
        <div >
          <div className="border-t border-b border-border p-layout">
            <Field placeholder="Search chats" Icon={Search}/>    
          </div>      
          <div>

          </div>      
        </div>
    )
}