import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageCircleHeart, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form  */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-12 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <MessageCircleHeart className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
                <p className="text-gray-500 dark:text-gray-400">Entre na sua conta para continuar</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 bg-white dark:bg-gray-800 h-11 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium block">
                  Senha
                </label>
                
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 bg-white dark:bg-gray-800 h-11 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full text-white h-11 rounded-md shadow-sm hover:shadow-md transition-all duration-300"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Entrando...</span>
                </div>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <div className="pt-4 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Não tem uma conta?{" "}
              <Link to="/signup" className="text-primary hover:text-primary-focus font-medium transition-colors">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Pattern */}
      <AuthImagePattern 
        title="Conecte-se à nossa plataforma"
        subtitle="Experimente uma interface limpa e moderna inspirada nos melhores designs."
      />
    </div>
  );
};

export default LoginPage;
