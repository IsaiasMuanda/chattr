
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
