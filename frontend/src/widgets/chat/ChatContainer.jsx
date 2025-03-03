import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useChatStore } from "../../entities/chatStore/useChatStore";
import { useAuthStore } from "../../entities/authStore/useAuthStore";

import MessageInput from "../../shared/ui/MessageInput";
import ChatHeader from "../../shared/ui/ChatHeader";
import MessageSkeleton from "../../shared/ui/skeletons/MessageSkeleton";
import { formatMessageTime } from "./models/formatMessageTime";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();

  const messageRef = useRef();

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, unsubscribeFromMessages, subscribeToMessages]);

  useEffect(() => {
    if (messageRef.current && messages) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  if (isMessagesLoading) {
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageRef}
          >
            <Link to={`/profile/${message.senderId === authUser._id ? "" : selectedUser._id}`}>
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "avatar.png"
                      : selectedUser.profilePic || "avatar.png"}
                  />
                </div>
            </div>
            </Link>
            <div className="chat-header mb-1">
              <time
                className="text-xs opacity-50 ml-1"
              >{formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col" style={{ display: "block", overflow: "visible", overflowWrap: "break-word", whiteSpace: "normal", maxWidth: "100%" }}            >
              {message.image && (
                <img src={message.image} alt="Attachment" className="sm:max-w-[200px] rounded-mb mb-2" />
              )}
              {message.text && (
                <p>{message.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer