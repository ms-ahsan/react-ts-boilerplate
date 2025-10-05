import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { api, ApiError } from "../lib/api";
import { toast } from "sonner";
// Generic hook for GET requests
export const useApiQuery = <T = any>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, ApiError>, "queryKey" | "queryFn">,
) => {
  return useQuery<T, ApiError>({
    queryKey,
    queryFn,
    ...options,
    onError: (error) => {
      toast.error("Error", {
        description: error.message,
      });

      options?.onError?.(error);
    },
  });
};

// Generic hook for POST/PUT/DELETE requests
export const useApiMutation = <T = any, V = any>(
  mutationFn: (variables: V) => Promise<T>,
  options?: Omit<UseMutationOptions<T, ApiError, V>, "mutationFn">,
) => {
  return useMutation<T, ApiError, V>({
    mutationFn,
    ...options,
    onError: (error) => {
      toast.error("Error", {
        description: error.message,
      });
      options?.onError?.(error);
    },
  });
};

// Specific hooks for common operations
export const useUsers = () => {
  return useApiQuery(["users"], () => api.getUsers(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUser = (id: number) => {
  return useApiQuery(["user", id], () => api.getUserById(id), {
    enabled: !!id,
  });
};

export const useUserPosts = (userId: number) => {
  return useApiQuery(["posts", userId], () => api.getPostsByUserId(userId), {
    enabled: !!userId,
  });
};

export const useAllPosts = () => {
  return useApiQuery(["posts"], () => api.getAllPosts(), {
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useApiMutation((post: Omit<any, "id">) => api.createPost(post), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (variables.userId) {
        queryClient.invalidateQueries({
          queryKey: ["posts", variables.userId],
        });
      }
      toast.success("Success", {
        description: "Post created successfully",
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useApiMutation(
    ({ id, post }: { id: number; post: Partial<any> }) =>
      api.updatePost(id, post),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        toast.success("Success", {
          description: "Post updated successfully",
        });
      },
    },
  );
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useApiMutation((id: number) => api.deletePost(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Success", {
        description: "Post deleted successfully",
      });
    },
  });
};
