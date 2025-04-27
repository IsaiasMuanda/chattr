import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
      <ChatHeader />
      
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-6"
        ref={messagesContainerRef}
      >
        {Object.keys(groupedMessages).map((date) => (
          <div key={date} className="space-y-4">
            <div className="flex justify-center">
              <div className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full">
                {date}
              </div>
            </div>
            
            {groupedMessages[date].map((message, index) => {
              const isMe = message.senderId === authUser._id;
              const showAvatar = index === 0 || 
                groupedMessages[date][index - 1]?.senderId !== message.senderId;
              
              return (
                <div
                  key={message._id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"} gap-2 relative`}
                >
                  {!isMe && showAvatar && (
                    <div className="flex-shrink-0 w-8 h-8">
                      <img
                        src={selectedUser.profilePic || "/avatar.png"}
                        alt="Avatar"
                        className="rounded-full w-full h-full object-cover border border-gray-200 dark:border-gray-700"
                      />
                    </div>
                  )}
                  
                  {!isMe && !showAvatar && <div className="w-8"></div>}
                  
                  <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[75%]`}>
                    <div
                      className={`
                        px-4 py-2 rounded-2xl break-words
                        ${isMe 
                          ? "bg-primary text-white rounded-tr-none" 
                          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none"}
                      `}
                    >
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Attachment"
                          className="max-w-full rounded-lg mb-2"
                        />
                      )}
                      {message.text && <p>{message.text}</p>}
                    </div>
                    <span className="text-xs text-gray-500 mt-1 px-1">
                      {formatMessageTime(message.createdAt)}
                    </span>
                  </div>
                  
                  {isMe && showAvatar && (
                    <div className="flex-shrink-0 w-8 h-8">
                      <img
                        src={authUser.profilePic || "/avatar.png"}
                        alt="Avatar"
                        className="rounded-full w-full h-full object-cover border border-gray-200 dark:border-gray-700"
                      />
                    </div>
                  )}
                  
                  {isMe && !showAvatar && <div className="w-8"></div>}
                </div>
              );
            })}
          </div>
        ))}
        
        <div ref={messageEndRef} />
      </div>
      
      <MessageInput />
    </div>
  );
};

export default ChatContainer;