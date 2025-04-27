import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers, onlineUsers]);

  const filteredUsers = users
    .filter((user) => showOnlineOnly ? onlineUsers.includes(user._id) : true)
    .filter((user) => user.fullName.toLowerCase().includes(searchQuery.toLowerCase()));

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-white dark:bg-gray-900 transition-all duration-200">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 w-full p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-medium text-lg hidden lg:block">Contatos</h2>
        </div>
        
        {/* Search and filter */}
        <div className="space-y-3">
          <div className="relative hidden lg:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text"
              placeholder="Buscar contatos..."
              className="input input-bordered input-sm w-full pl-9 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary/30 border-gray-200 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">Mostrar apenas online</span>
            </label>
            <span className="text-xs text-gray-500">({onlineUsers.length - 1} online)</span>
          </div>
        </div>
      </div>
      
      {/* Users list */}
      <div className="overflow-y-auto w-full py-2 flex-1 scrollbar-thin">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-2 flex items-center gap-3
                hover:bg-gray-200/70 dark:hover:bg-gray-800/70 transition-colors
                ${selectedUser?._id === user._id ? "bg-gray-200/80 dark:bg-gray-800/80" : ""}
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500
                     rounded-full ring-2 ring-white dark:ring-gray-900"
                  />
                )}
              </div>
              
              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-medium truncate text-gray-800 dark:text-gray-200">{user.fullName}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  {/* <span className={`w-1.5 h-1.5 rounded-full ${onlineUsers.includes(user._id) ? "bg-green-500" : "bg-gray-400"}`}></span> */}
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-gray-500 py-6 px-4">
            {searchQuery ? "Nenhum contato encontrado" : "Nenhum usuário online"}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;