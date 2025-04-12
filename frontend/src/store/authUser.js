import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  // Sign up a new user
  signup: async (name, email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );

      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Signup failed",
        loading: false,
      });
    }
  },

  // Log in an existing user
  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },

  // Check if already authenticated (e.g. via Google session)
  authCheck: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(
        "http://localhost:4000/api/auth/profile",
        { withCredentials: true }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
        error: null
      });
    } catch (err) {
        console.log(err);
        
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      });
    }
  },


  // Log out
  logout: async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      set({ user: null, isAuthenticated: false });
    } catch (err) {
      console.error("Logout failed", err);
    }
  },
}));

export default useAuthStore;
