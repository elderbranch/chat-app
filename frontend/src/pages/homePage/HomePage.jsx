import { useChatStore } from "../../entities/chatStore/useChatStore"
import ChatContainer from "../../widgets/chat/ChatContainer";
import NoChatSelected from "../../shared/ui/NoChatSelected";
import SideBar from "../../shared/ui/SideBar";
// bg-base-200

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="bg-[url(../../assets/back.jpg)] h-screen bg-cover bg-center">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SideBar/>

            {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage