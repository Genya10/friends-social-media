import Chat from "./components/screens/chats/Chat";
import ChatList from "./components/screens/chats/ChatList";
import CurrentUser from "./components/screens/chats/CurrentUser";

export default function ChatPage() {

  return (
    <div className="grid" style={{
      gridTemplateColumns:'1fr 3fr'
    }}>
      <div>
        <CurrentUser/>
        <ChatList/>
      </div>
      <div>
        <Chat/>
      </div>
    </div>
  );
}
