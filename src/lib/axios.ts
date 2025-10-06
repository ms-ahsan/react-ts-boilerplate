/* eslint-disable no-case-declarations */
import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { API_CONFIG, HTTP_STATUS, ERROR_MESSAGES } from "../configs";

// Create a custom error class for API errors
export class ApiError extends Error {
  public status?: number;
  public data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

//Custom type: extend InternalAxiosRequestConfig
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: Date;
  };
}

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    // Add auth token if available
    const authData = localStorage.getItem("auth");
    if (authData) {
      const { user } = JSON.parse(authData);
      if (user?.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };

    console.log(
      `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
      config.data,
    );
    return config;
  },
  (error: AxiosError) => {
    console.error("[API Request Error]", error);
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Calculate request duration
    const endTime = new Date();
    const startTime = (response.config as CustomAxiosRequestConfig).metadata
      ?.startTime;
    const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;

    console.log(
      `[API Response] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`,
      response.data,
    );

    return response;
  },
  (error: AxiosError) => {
    // Handle different types of errors
    if (error.code === "ECONNABORTED") {
      throw new ApiError(ERROR_MESSAGES.TIMEOUT_ERROR);
    }

    if (!error.response) {
      throw new ApiError(ERROR_MESSAGES.NETWORK_ERROR);
    }

    const { status, data } = error.response;

    // Handle specific HTTP status codes
    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
        // Clear auth data and redirect to login
        localStorage.removeItem("auth");
        window.location.href = "/login";
        throw new ApiError(ERROR_MESSAGES.UNAUTHORIZED, status, data);

      case HTTP_STATUS.FORBIDDEN:
        throw new ApiError(ERROR_MESSAGES.UNAUTHORIZED, status, data);

      case HTTP_STATUS.NOT_FOUND:
        throw new ApiError(ERROR_MESSAGES.NOT_FOUND, status, data);

      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        throw new ApiError(ERROR_MESSAGES.SERVER_ERROR, status, data);

      default:
        // Use server-provided error message if available
        const safeData = (data || {}) as Record<string, unknown>;
        const message =
          (safeData.message as string) ||
          (safeData.error as string) ||
          ERROR_MESSAGES.UNKNOWN_ERROR;
        throw new ApiError(message, status, data);
    }
  },
);

// Utility function to handle API errors
export const handleApiError = (error: any): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    return new ApiError(
      error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      error.response?.status,
      error.response?.data,
    );
  }

  return new ApiError(error.message || ERROR_MESSAGES.UNKNOWN_ERROR);
};

// Generic request wrapper with retry logic
export const apiRequest = async <T = any>(
  config: AxiosRequestConfig,
  retryCount = 0,
): Promise<T> => {
  try {
    const response = await axiosInstance.request<T>(config);
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error);
    const status = apiError.status ?? 0;

    // Retry logic for specific errors
    if (
      retryCount < API_CONFIG.RETRY_ATTEMPTS &&
      (status >= 500 || status === 0)
    ) {
      console.log(
        `[API Retry] Attempt ${retryCount + 1}/${API_CONFIG.RETRY_ATTEMPTS}`,
      );
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * (retryCount + 1)),
      );
      return apiRequest<T>(config, retryCount + 1);
    }

    throw apiError;
  }
};

export default axiosInstance;
