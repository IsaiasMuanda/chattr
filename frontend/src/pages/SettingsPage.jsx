// import React, { useState } from 'react';
// import { Camera, Loader2, Lock, Moon, Palette, Save, Sun, Trash } from 'lucide-react';
// import { useAuthStore } from '../store/useAuthStore';

// const SettingsPage = () => {
//   const { authUser, isUpdatingProfile, updateProfile, deleteAccount, isDeletingAccount } = useAuthStore();
//   const [fullName, setFullName] = useState(authUser?.fullName || '');
//   const [bio, setBio] = useState(authUser?.bio || '');
//   const [password, setPassword] = useState('');
//   const [selectedImg, setSelectedImg] = useState(null);
//   const [profilePic, setProfilePic] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => {
//       setSelectedImg(reader.result);
//       setProfilePic(reader.result);
//     };
//   };

//   const handleSaveChanges = async () => {
//     const updateData = {};
    
//     if (fullName !== authUser?.fullName) {
//       updateData.fullName = fullName;
//     }
    
//     if (password && password.length >= 6) {
//       updateData.password = password;
//     }

//     if (bio !== authUser?.bio) {
//       updateData.bio = bio;
//     }
    
//     if (profilePic) {
//       updateData.profilePic = profilePic;
//     }
    
//     if (Object.keys(updateData).length > 0) {
//       await updateProfile(updateData);
//       setPassword('');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Configurações</h1>
//         <p className="text-gray-500 dark:text-gray-400">Gerencie sua conta e preferências</p>
//       </div>

//       {/* Profile Section */}
//       <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm mb-6">
//         <div className="p-4 border-b border-gray-100 dark:border-gray-700">
//           <h2 className="text-lg font-medium text-gray-800 dark:text-white">Perfil</h2>
//         </div>
//         <div className="p-4">
//           <div className="flex items-center space-x-4 mb-6">
//             <div className="relative">
//               <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
//                 <img
//                   src={selectedImg || authUser?.profilePic || "/avatar.png"}
//                   alt="Foto de perfil"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <label
//                 htmlFor="avatar-upload"
//                 className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 p-2 rounded-full cursor-pointer 
//                   transition-all duration-200 border-2 border-white dark:border-gray-800"
//               >
//                 <Camera className="w-3 h-3 text-white" />
//                 <input
//                   type="file"
//                   id="avatar-upload"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   disabled={isUpdatingProfile}
//                 />
//               </label>
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-800 dark:text-white">{authUser?.fullName || "Nome do Usuário"}</h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400">{authUser?.email || "usuario@email.com"}</p>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">
//                 Nome completo
//               </label>
//               <input
//                 type="text"
//                 className="w-full py-2 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/80 transition-all"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 placeholder="Seu nome completo"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">
//                 Bio
//               </label>
//               <textarea
//                 className="w-full py-2 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/80 transition-all resize-none"
//                 rows="3"
//                 value={bio}
//                 onChange={(e) => setBio(e.target.value)}
//                 placeholder="Fale um pouco sobre você..."
//               ></textarea>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Privacy Settings */}
//       <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm mb-6">
//         <div className="p-4 border-b border-gray-100 dark:border-gray-700">
//           <h2 className="text-lg font-medium text-gray-800 dark:text-white">Privacidade e Segurança</h2>
//         </div>
//         <div className="p-4 space-y-2">
//           <div>
//             <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">
//               Nova senha
//             </label>
//             <input
//               type="password"
//               className="w-full py-2 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/80 transition-all"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Digite uma nova senha"
//             />
//             {password && password.length < 6 && (
//               <p className="text-red-500 text-xs mt-1">A senha deve conter no mínimo 6 caracteres</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Appearance Settings */}
//       <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm mb-6">
//         <div className="p-4 border-b border-gray-100 dark:border-gray-700">
//           <h2 className="text-lg font-medium text-gray-800 dark:text-white">Aparência</h2>
//         </div>
//         <div className="p-4 space-y-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
//                 <Palette className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//               </div>
//               <div>
//                 <p className="font-medium text-gray-800 dark:text-white">Tema</p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Escolha entre tema claro ou escuro</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsDarkMode(!isDarkMode)}
//               className={`flex items-center justify-center w-12 h-6 ${isDarkMode ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'} rounded-full relative transition-colors`}
//               aria-pressed={isDarkMode}
//               role="switch"
//             >
//               <span
//                 className={`absolute w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'}`}
//               ></span>
//               <Sun className="w-3.5 h-3.5 absolute left-1.5" />
//               <Moon className="w-3.5 h-3.5 absolute right-1.5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Save Button */}
//       <button
//         onClick={handleSaveChanges}
//         disabled={isUpdatingProfile || (password && password.length < 6)}
//         className="py-2.5 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-md shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2 mb-6"
//       >
//         {isUpdatingProfile ? (
//           <Loader2 className="w-4 h-4 animate-spin" />
//         ) : (
//           <Save className="w-4 h-4" />
//         )}
//         <span>{isUpdatingProfile ? 'Salvando...' : 'Salvar alterações'}</span>
//       </button>

//       {/* Delete Account Section */}
//       <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm p-4">
//         <h2 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4">Deletar Conta</h2>
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//           Esta ação é irreversível. Sua conta será permanentemente removida.
//         </p>
//         <button
//           onClick={() => deleteAccount(authUser._id)}
//           disabled={isDeletingAccount}
//           className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2"
//         >
//           {isDeletingAccount ? (
//             <Loader2 className="w-4 h-4 animate-spin" />
//           ) : (
//             <Trash className="w-4 h-4" />
//           )}
//           <span>{isDeletingAccount ? 'Deletando...' : 'Deletar Conta'}</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;

import React, { useState } from 'react';
import { Camera, Loader2, Lock, Moon, Palette, Save, Sun, Trash, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { authUser, isUpdatingProfile, updateProfile, deleteAccount, isDeletingAccount } = useAuthStore();
  const [fullName, setFullName] = useState(authUser?.fullName || '');
  const [bio, setBio] = useState(authUser?.bio || '');
  const [password, setPassword] = useState('');
  const [selectedImg, setSelectedImg] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setSelectedImg(reader.result);
      setProfilePic(reader.result);
    };
  };

  const handleSaveChanges = async () => {
    const updateData = {};
    
    if (fullName !== authUser?.fullName) {
      updateData.fullName = fullName;
    }
    
    if (password && password.length >= 6) {
      updateData.password = password;
    }

    if (bio !== authUser?.bio) {
      updateData.bio = bio;
    }
    
    if (profilePic) {
      updateData.profilePic = profilePic;
    }
    
    if (Object.keys(updateData).length > 0) {
      await updateProfile(updateData);
      setPassword('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen pb-12">


      <div className="max-w-3xl mx-auto px-4 mt-24">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Configurações da Conta</h1>
          <p className="text-gray-500 dark:text-gray-400">Gerencie seu perfil, privacidade e preferências</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm mb-6">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Perfil</h2>
          </div>
          <div className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
              <div className="relative mx-auto sm:mx-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-md">
                  <img
                    src={selectedImg || authUser?.profilePic || "/avatar.png"}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer 
                    transition-all duration-200 border-2 border-white dark:border-gray-800 shadow"
                >
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <div className="text-center sm:text-left grow">
                <h3 className="font-medium text-gray-800 dark:text-white text-lg">{authUser?.fullName || "Nome do Usuário"}</h3>
                <p className="text-gray-500 dark:text-gray-400">{authUser?.email || "usuario@email.com"}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Faça upload de uma foto com seu rosto para personalizar seu perfil
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  className="w-full py-2.5 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  Bio
                </label>
                <textarea
                  className="w-full py-2.5 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  rows="4"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Fale um pouco sobre você..."
                ></textarea>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Essa descrição aparecerá no seu perfil público</p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm mb-6">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center">
            <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Privacidade e Segurança</h2>
          </div>
          <div className="p-5 space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Nova senha
              </label>
              <input
                type="password"
                className="w-full py-2.5 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite uma nova senha"
              />
              {password && (
                <div className="mt-2">
                  {password.length < 6 ? (
                    <p className="text-red-500 text-xs">A senha deve conter no mínimo 6 caracteres</p>
                  ) : (
                    <p className="text-green-500 text-xs">Senha válida</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm mb-8">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center">
            <Palette className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Aparência</h2>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Tema</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Escolha entre tema claro ou escuro</p>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center justify-between w-14 h-7 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'} rounded-full px-1 relative transition-colors`}
                aria-pressed={isDarkMode}
                role="switch"
              >
                <Sun className={`w-4 h-4 ${isDarkMode ? 'text-blue-200' : 'text-yellow-500'}`} />
                <Moon className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-400'}`} />
                <span
                  className={`absolute w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-0'}`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          {/* Save Button */}
          <button
            onClick={handleSaveChanges}
            disabled={isUpdatingProfile || (password && password.length < 6)}
            className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 order-2 sm:order-1"
          >
            {isUpdatingProfile ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            <span>{isUpdatingProfile ? 'Salvando...' : 'Salvar alterações'}</span>
          </button>

          {/* Delete Account Button */}
          <button
            onClick={() => deleteAccount(authUser._id)}
            disabled={isDeletingAccount}
            className="py-2.5 px-5 bg-red-50 dark:bg-gray-800 border border-red-200 dark:border-red-500/30 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 order-1 sm:order-2"
          >
            {isDeletingAccount ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Trash className="w-5 h-5" />
            )}
            <span>{isDeletingAccount ? 'Deletando...' : 'Deletar Conta'}</span>
          </button>
        </div>
        
        {/* Warning About Deletion */}
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">
            <strong>Atenção:</strong> Deletar sua conta é uma ação irreversível. Todos os seus dados serão permanentemente removidos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
