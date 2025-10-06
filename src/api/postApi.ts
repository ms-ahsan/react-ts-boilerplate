import axiosInstance from "../lib/axios";

export const postApi = {
  getAllPosts: async (): Promise<any[]> => {
    const response = await axiosInstance.get<any[]>("/posts");
    return response.data;
  },

  createPost: async (post: Omit<any, "id">): Promise<any> => {
    const response = await axiosInstance.post("/posts", post);
    return response.data;
  },

  updatePost: async (id: number, post: Partial<any>): Promise<any> => {
    const response = await axiosInstance.put(`/posts/${id}`, post);
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/posts/${id}`);
  },
};
