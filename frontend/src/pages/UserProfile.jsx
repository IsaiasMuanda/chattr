
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Calendar, Edit, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { 
    getUserProfile, 
    viewedProfile, 
    authUser, 
    isGettingUserProfile
  } = useAuthStore();
  
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    if (id) {
      getUserProfile(id);
    }
  }, [id, getUserProfile]);

  useEffect(() => {
    if (authUser && viewedProfile) {
      setIsCurrentUser(authUser._id === viewedProfile._id);
    }
  }, [authUser, viewedProfile]);

  if (isGettingUserProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!viewedProfile) {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

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
            {/* Edit Button (only shown if viewing own profile) */}
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
                    src={viewedProfile.profilePic || "/avatar.png"}
                    alt={viewedProfile.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* User Details */}
              <div className="text-center md:text-left flex-grow mt-4 md:mt-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {viewedProfile.fullName}
                </h1>
                <div className="flex items-center justify-center md:justify-start mt-3 text-gray-600 dark:text-gray-300">
                  <Mail size={16} className="mr-2" />
                  <span>{viewedProfile.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600 dark:text-gray-300">
                  <Calendar size={16} className="mr-2" />
                  <span>Membro desde {formatDate(viewedProfile.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Bio</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {viewedProfile.bio || "Este usuário ainda não adicionou uma biografia."}
            </p>
          </div>

          {/* Additional sections can be added here with the same width constraints */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;