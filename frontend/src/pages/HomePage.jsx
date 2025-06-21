import React, { useEffect } from 'react';
import SideBar from '../components/layout/Chat/SideBar';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';


const HomePage = () => {
  const { authUser } = useAuthStore();

  const {
    users,
    messages,
    selectedUser,
    isUsersLoading,
    isMessagesLoading,
    getUsers,
    getMessages,
    setSelectedUser,
  } = useChatStore();

  // Fetch all users on load
  useEffect(() => {
    getUsers();
  }, []);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Left Sidebar: Users */}
      <SideBar/>
      


      {/* Right Panel: Chat or Welcome */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {!selectedUser ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <img src="chatting.png" alt="Welcome" className="w-60 h-60 mb-6" />
            <h2 className="text-3xl font-bold text-[#4B0082] dark:text-white mb-2">Welcome to AuraChat</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Select a conversation from the sidebar or start a new chat to begin messaging. AuraChat lets you stay connected with your friends in real time — fast, secure, and easy to use.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4">Chat with {selectedUser.name}</h3>
            {isMessagesLoading ? (
              <p>Loading messages...</p>
            ) : messages.length > 0 ? (
              <div className="space-y-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-xs p-3 rounded-lg ${msg.sender === authUser.user._id
                      ? 'bg-purple-100 ml-auto text-right'
                      : 'bg-white dark:bg-gray-700 text-left'
                      }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs text-gray-500 block mt-1">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No messages yet.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
