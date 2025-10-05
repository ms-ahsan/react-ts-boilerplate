import type { User, Post } from "../types";
import { apiRequest } from "./axios";
import type { AxiosRequestConfig } from "axios";

// Simulate network delay for development
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    await delay(800); // Simulate network delay

    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/users",
    };

    return apiRequest<User[]>(config);
  },

  // Get user by ID
  getUserById: async (id: number): Promise<User> => {
    await delay(500);

    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/users/${id}`,
    };

    return apiRequest<User>(config);
  },

  // Get posts by user ID
  getPostsByUserId: async (userId: number): Promise<Post[]> => {
    await delay(600);

    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/posts",
      params: {
        userId,
      },
    };

    return apiRequest<Post[]>(config);
  },

  // Get all posts
  getAllPosts: async (): Promise<Post[]> => {
    await delay(600);

    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/posts",
    };

    return apiRequest<Post[]>(config);
  },

  // Create a new post
  createPost: async (post: Omit<Post, "id">): Promise<Post> => {
    await delay(700);

    const config: AxiosRequestConfig = {
      method: "POST",
      url: "/posts",
      data: post,
    };

    return apiRequest<Post>(config);
  },

  // Update a post
  updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
    await delay(500);

    const config: AxiosRequestConfig = {
      method: "PUT",
      url: `/posts/${id}`,
      data: post,
    };

    return apiRequest<Post>(config);
  },

  // Delete a post
  deletePost: async (id: number): Promise<void> => {
    await delay(400);

    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/posts/${id}`,
    };

    return apiRequest<void>(config);
  },

  // Upload file (example)
  uploadFile: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("file", file);

    const config: AxiosRequestConfig = {
      method: "POST",
      url: "/upload",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return apiRequest<{ url: string }>(config);
  },
};

// Export types for API responses
export type ApiResponse<T = any> = {
  data: T;
  status: number;
  message?: string;
};

// Export error types
export type { ApiError } from "./axios";
