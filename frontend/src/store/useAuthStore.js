
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null, // Usuário atual logado
  viewedProfile: null, // Usuário sendo visualizado (perfil)
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isDeletingAccount: false,
  isGettingUserProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Conta criada com sucesso");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login feito com sucesso");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, viewedProfile: null });
      toast.success("Logout feito com sucesso");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const { fullName, password, profilePic, bio } = data;

      if (!fullName && !password && !profilePic && !bio) {
        toast.error("Escolha pelo menos um campo para atualizar");
        return;
      }

      const res = await axiosInstance.put("/auth/update", data);

      set({ authUser: res.data });
      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  getUserProfile: async (userId) => {
    set({ isGettingUserProfile: true });
    try {
      const res = await axiosInstance.get(`/auth/profile/${userId}`);
      
      // Agora armazenamos o perfil em viewedProfile em vez de sobrescrever authUser
      set({ viewedProfile: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGettingUserProfile: false });
    }
  },

  deleteAccount: async (userid) => {
    set({ isDeletingAccount: true });
    try {
      await axiosInstance.delete(`/auth/delete/${userid}`);
      set({ authUser: null, viewedProfile: null });
      toast.success("Conta deletada com sucesso");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isDeletingAccount: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));