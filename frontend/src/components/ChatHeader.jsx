// // import { ArrowLeft, MoreHorizontal, Phone, Video, X } from "lucide-react";
// // import { useAuthStore } from "../store/useAuthStore";
// // import { useChatStore } from "../store/useChatStore";

// // const ChatHeader = () => {
// //   const { selectedUser, setSelectedUser } = useChatStore();
// //   const { onlineUsers } = useAuthStore();
// //   const isOnline = onlineUsers.includes(selectedUser._id);

// //   return (
// //     <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
// //       <div className="flex items-center justify-between">
// //         <div className="flex items-center gap-3">
// //           {/* Mobile back button */}
// //           <button 
// //             className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
// //             onClick={() => setSelectedUser(null)}
// //           >
// //             <ArrowLeft className="w-5 h-5" />
// //           </button>
          
// //           {/* Avatar */}
// //           <div className="relative">
// //             <div className="w-10 h-10 rounded-full overflow-hidden">
// //               <img 
// //                 src={selectedUser.profilePic || "/avatar.png"} 
// //                 alt={selectedUser.fullName}
// //                 className="w-full h-full object-cover" 
// //               />
// //             </div>
// //             {isOnline && (
// //               <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
// //             )}
// //           </div>
          
// //           {/* User info */}
// //           <div>
// //             <h3 className="font-medium text-gray-800 dark:text-gray-200">{selectedUser.fullName}</h3>
// //             <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
// //               <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></span>
// //               {isOnline ? "Online" : "Offline"}
// //             </p>
// //           </div>
// //         </div>
        
// //         {/* Actions */}
// //         <div className="flex items-center gap-4">
// //           <button 
// //             onClick={() => setSelectedUser(null)}
// //             className="hidden lg:flex text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
// //           >
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatHeader;

// import { ArrowLeft, MoreHorizontal, Phone, Video, X } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";
// import { useChatStore } from "../store/useChatStore";
// import { Link } from "react-router-dom";

// const ChatHeader = () => {
//   const { selectedUser, setSelectedUser } = useChatStore();
//   const { onlineUsers } = useAuthStore();
//   const isOnline = onlineUsers.includes(selectedUser._id);

//   return (
//     <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {/* Mobile back button */}
//           <button
//             className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//             onClick={() => setSelectedUser(null)}
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
          
//           {/* Avatar - Link to profile */}
//           <Link to={`/profile/${selectedUser._id}`} className="relative">
//             <div className="w-10 h-10 rounded-full overflow-hidden">
//               <img
//                 src={selectedUser.profilePic || "/avatar.png"}
//                 alt={selectedUser.fullName}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             {isOnline && (
//               <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
//             )}
//           </Link>
          
//           {/* User info - Link to profile */}
//           <Link to={`/profile/${selectedUser._id}`}>
//             <h3 className="font-medium text-gray-800 dark:text-gray-200 hover:underline">
//               {selectedUser.fullName}
//             </h3>
//             <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
//               <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></span>
//               {isOnline ? "Online" : "Offline"}
//             </p>
//           </Link>
//         </div>
        
//         {/* Actions */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => setSelectedUser(null)}
//             className="hidden lg:flex text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatHeader;

import { ArrowLeft, MoreHorizontal, Phone, Video, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { Link } from "react-router-dom";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile back button */}
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setSelectedUser(null)}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          {/* Avatar - Link to profile */}
          <Link to={`/profile/${selectedUser._id}`} className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
            )}
          </Link>
          
          {/* User info - Link to profile */}
          <Link to={`/profile/${selectedUser._id}`}>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 hover:underline">
              {selectedUser.fullName}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></span>
              {isOnline ? "Online" : "Offline"}
            </p>
          </Link>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedUser(null)}
            className="hidden lg:flex text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;