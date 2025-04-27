import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Menu, MessageCircleHeart } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed w-full top-0 z-40 
      backdrop-blur-lg bg-white/90 dark:bg-gray-900/90"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo and brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-all">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <MessageCircleHeart className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-primary ">
                Chattr
              </h1>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-3">


            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Perfil</span>
                </Link>

                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile navigation button */}
          {authUser && (
            <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {showMobileMenu && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 animate-fadeDown">

          {authUser && (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all"
                onClick={() => setShowMobileMenu(false)}
              >
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </Link>

              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  logout();
                }}
                className="flex items-center gap-2 p-3 w-full text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;