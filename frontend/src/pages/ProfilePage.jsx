// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import { Camera, Mail, Loader2, User, Calendar } from "lucide-react";

// const ProfilePage = () => {
//   const { authUser } = useAuthStore();

//   // Formata a data para exibição
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
    
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('pt-BR', {
//       month: '2-digit',
//       year: '2-digit'
//     }).format(date);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8 pt-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Perfil</h1>
//         <p className="text-gray-500 dark:text-gray-400">Perfil Chattr</p>
//       </div>

//       {/* Profile Card */}
//       <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm mb-6">
//         <div className="p-6">
//           {/* Avatar upload section */}
//           <div className="flex flex-col items-center gap-4 mb-8">
//             <div className="relative">
//               <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm">
//                 <img
//                   src={ authUser?.profilePic || "/avatar.png"}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
              
//             </div>
           
//           </div>

//           {/* Profile Info - MODIFICADO para parecer informação e não input */}
//           <div className="space-y-6">
//             <div className="space-y-2">
//               <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1">
//                 <User className="w-4 h-4" />
//                 Nome completo
//               </div>
//               <div className="text-gray-800 dark:text-gray-200 font-medium">
//                 {authUser?.fullName || "Nome não disponível"}
//               </div>
//             </div>

//             <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700">
//               <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1">
//                 <Mail className="w-4 h-4" />
//                 Email
//               </div>
//               <div className="text-gray-800 dark:text-gray-200 font-medium">
//                 {authUser?.email || "Email não disponível"}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Account Information */}
//       <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm">
//         <div className="p-4 border-b border-gray-100 dark:border-gray-700">
//           <h2 className="text-lg font-medium text-gray-800 dark:text-white">Informações da conta</h2>
//         </div>
//         <div className="p-6">
//           <div className="space-y-4">
//             <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
//               <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
//                 <Calendar className="w-4 h-4 text-gray-500" />
//                 <span>Membro desde</span>
//               </div>
//               <span className="text-gray-800 dark:text-gray-200 font-medium">
//                 {formatDate(authUser?.createdAt) || "Data não disponível"}
//               </span>
//             </div>
            
//             <div className="flex items-center justify-between py-3">
//               <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
//                 <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
//                   <div className="w-2 h-2 rounded-full bg-white"></div>
//                 </div>
//                 <span>Status da conta</span>
//               </div>
//               <span className="text-green-500 font-medium">Ativo</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default ProfilePage;

import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Calendar, Edit, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isGettingUserProfile } = useAuthStore();
  const navigate = useNavigate();

  const [isCurrentUser, setIsCurrentUser] = useState(true); // Sempre será verdadeiro, pois é o perfil do usuário logado.

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  if (isGettingUserProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Usuário não encontrado</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Voltar</span>
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {/* Profile Header with Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            {/* Edit Button */}
            {isCurrentUser && (
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => navigate('/settings')}
                  className="flex items-center px-4 py-2 bg-white bg-opacity-90 text-blue-600 rounded-md hover:bg-opacity-100 transition-all shadow"
                >
                  <Edit size={16} className="mr-2" />
                  <span>Editar Perfil</span>
                </button>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="px-6 py-6">
            <div className="flex flex-col md:flex-row">
              {/* Profile Picture */}
              <div className="flex-shrink-0 relative -mt-20 mb-4 md:mb-0 md:mr-6 mx-auto md:mx-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 shadow-lg">
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt={authUser.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* User Details */}
              <div className="text-center md:text-left flex-grow mt-4 md:mt-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {authUser.fullName}
                </h1>
                <div className="flex items-center justify-center md:justify-start mt-3 text-gray-600 dark:text-gray-300">
                  <Mail size={16} className="mr-2" />
                  <span>{authUser.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600 dark:text-gray-300">
                  <Calendar size={16} className="mr-2" />
                  <span>Membro desde {formatDate(authUser.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Bio</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {authUser.bio || "Você ainda não adicionou uma biografia."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
