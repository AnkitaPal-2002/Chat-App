import React from 'react'
import { useChatStore } from '../../../store/useChatStore'
import { useAuthStore } from '../../../store/useAuthStore'
const SideBar = () => {
    const { users, selectedUser, isUsersLoading, setSelectedUser } = useChatStore();
  return (
    <div>
      <aside className="w-full max-w-xs h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-300 dark:border-gray-600">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] dark:placeholder-gray-400"
          />
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          {isUsersLoading ? (
            <p className="text-sm p-4">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-sm p-4">No users found.</p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center gap-3 cursor-pointer px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedUser?._id === user._id ? 'bg-gray-100 dark:bg-gray-700' : ''
                  }`}
              >
                {/* Profile Picture Placeholder */}
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-semibold text-white uppercase overflow-hidden">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.name || 'User'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{user.name?.charAt(0) || '?'}</span>
                  )}
                </div>


                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{user.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Now</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    Start chatting with {user.name.split(' ')[0]}...
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  )
}

export default SideBar
