import { PropsWithChildren } from "react";
import CurrentUser from "./CurrentUser";
import ChatList from "./list/ChatList";
import Chat from "./chat/Chat";

interface IChatsSreen extends PropsWithChildren {}

export function ChatsScreen({ children }: IChatsSreen) {
  const Component = () =>
    children ? (
      <>{children}</>
    ) : (
      <p className="p-layout">Click chat on the left side for open</p>
    );

  return (
    <div
      className="grid h-full"
      style={{
        gridTemplateColumns: ".7fr 3fr",
      }}
    >
      <div className="border-r border-border">
        <CurrentUser />
        <ChatList />
      </div>
      <div>
        <Component />
      </div>
    </div>
  );
}
