import axiosInstance from "../lib/axios";
import type { User } from "../types";

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>("/users");
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await axiosInstance.get<User>(`/users/${id}`);
    return response.data;
  },

  getPostsByUserId: async (userId: number): Promise<any[]> => {
    const response = await axiosInstance.get<any[]>(`/users/${userId}/posts`);
    return response.data;
  },
};
