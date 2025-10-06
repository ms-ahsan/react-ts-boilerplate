import { useApiQuery, useApiMutation } from "./useApi";
import { postApi } from "../api/postApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAllPosts = () => {
  return useApiQuery(["posts"], () => postApi.getAllPosts(), {
    staleTime: 1000 * 60 * 2, // 2 menit
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useApiMutation((post: Omit<any, "id">) => postApi.createPost(post), {
    onSuccess: (variables) => {
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
      postApi.updatePost(id, post),
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

  return useApiMutation((id: number) => postApi.deletePost(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Success", {
        description: "Post deleted successfully",
      });
    },
  });
};
