import { useApiQuery } from "./useApi";
import { userApi } from "../api/userApi";

export const useUsers = () => {
  return useApiQuery(["users"], () => userApi.getUsers(), {
    staleTime: 1000 * 60 * 5, // cache 5 menit
  });
};

export const useUser = (id: any) => {
  return useApiQuery(["user", id], () => userApi.getUserById(id), {
    enabled: !!id,
  });
};

export const useUserPosts = (userId: any) => {
  return useApiQuery(
    ["posts", userId],
    () => userApi.getPostsByUserId(userId),
    {
      enabled: !!userId,
    },
  );
};
