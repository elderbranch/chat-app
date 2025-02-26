import { useAuthStore } from '../../entities/authStore/useAuthStore';
import { useChatStore } from '../../entities/chatStore/useChatStore';

import { X } from "lucide-react";
import { Link } from "react-router-dom";


const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  console.log(selectedUser);

  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${selectedUser._id}`}>
            <div className="avatar">
              <div className="size-10 rounded-full relative">
                <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
              </div>
            </div>
          </Link>
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader