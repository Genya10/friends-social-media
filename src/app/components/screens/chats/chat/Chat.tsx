import { MessageField } from "./MessageField"

export default function Chat(){
    return (
        <div className="w-8/12 border-r border-border h-full">
          {/**@ts-ignore */}
          <MessageField />
        </div>
    )
}