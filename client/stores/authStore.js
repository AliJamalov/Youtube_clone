import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoading: false,
  error: null,

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/auth/check-auth");
      set({ authUser: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/register", data);
      set({ authUser: response.data });
      toast.success("Account created successfully");
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post("/auth/log-out");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
