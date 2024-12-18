import { create } from "zustand";
import { Auth, defaultUser, User, UserStore } from "../definitions";
import axios from "axios";

// const BASE_URL = "https://social-media-server-wine.vercel.app";
const BASE_URL = "http://localhost:9000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const useUser = create<UserStore>((set, get) => ({
  users: [],
  user: defaultUser,

  setUser: (user: User) =>
    set((state) => ({
      users: [...state.users, user],
      user,
    })),

  authUser: async ({ email, password }: Auth) => {
    try {
      const res = await api.post("/api/users/auth", { email, password });
      const { success, message, data } = res.data;
      return { success, message, data };
    } catch (error) {
      return {
        success: false,
        message: "Error authenticating user",
        data: null,
      };
    }
  },

  createUser: async (newUser: User) => {
    try {
      const res = await axios.post(
        "/api/users/register",
        newUser
      );
      return res.data;
    } catch (error) {
      const { data } = error.response;
      return {
        success: data.success,
        message: data.message,
        data: data.data,
      };
    }
  },

  fetchUsers: async () => {
    try {
      const res = await api.get("/api/users");
      const data = res.data;
      set({ users: data.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  fetchUser: async (id: string) => {
    try {
      const { users } = get();
      const userExists = users.find((user) => user._id === id);
      if (!userExists) {
        const res = await api.get(`/api/users/${id}`);
        const data = res.data;
        set({ users: [...users, data.data] });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },

  logoutUser: async () => {
    try {
      const res = await api.get(`/api/users/logout`);
      const { success, message } = res.data;
      return { success, message };
    } catch (error) {
      console.error("Error logging out a user:", error);
      return {
        success: false,
        message: "Error logging out a user",
      };
    }
  },
}));
