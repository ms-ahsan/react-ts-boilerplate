/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useMutation,
  useQuery,
  type UseQueryResult,
  type UseMutationResult,
  type QueryKey,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type { ApiError } from "../lib/axios";

export const useApiQuery = <TData = any>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: {
    enabled?: boolean;
    refetchInterval?: number | false;
    refetchOnWindowFocus?: boolean;
    staleTime?: number;
    gcTime?: number;
    retry?: boolean | number;
    onSuccess?: (data: TData) => void;
    onError?: (error: ApiError) => void;
  },
): UseQueryResult<TData, ApiError> => {
  return useQuery<TData, ApiError>({
    queryKey,
    queryFn,
    enabled: options?.enabled ?? true,
    refetchInterval: options?.refetchInterval,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    staleTime: options?.staleTime,
    gcTime: options?.gcTime,
    retry: options?.retry,

    select: (data) => data,
    meta: {
      onError: (error: ApiError) => {
        toast.error("Error", { description: error.message });
        options?.onError?.(error);
      },
    },
  });
};

/**
 * Mutation API (POST/PUT/DELETE)
 */
export const useApiMutation = <TData = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: ApiError) => void;
    onSettled?: () => void;
  },
): UseMutationResult<TData, ApiError, TVariables> => {
  return useMutation<TData, ApiError, TVariables>({
    mutationFn,

    onSuccess: (data, _variables, _context) => {
      options?.onSuccess?.(data);
    },
    onError: (error, _variables, _context) => {
      toast.error("Error", { description: error.message });
      options?.onError?.(error);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
  });
};
