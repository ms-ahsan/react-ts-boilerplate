// API Configuration
export const API_CONFIG = {
  BASE_URL: "https://jsonplaceholder.typicode.com",
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  HEADERS: {
    "Content-Type": "application/json",
  },
} as const;

// Application Configuration
export const APP_CONFIG = {
  NAME: "React Boilerplate",
  VERSION: "1.0.0",
  DESCRIPTION:
    "A modern React application with TypeScript, TanStack Query, and Shadcn UI",
} as const;

// UI Configuration
export const UI_CONFIG = {
  TOAST_DURATION: 5000, // 5 seconds
  LOADING_DELAY: 300, // 300ms
  DEBOUNCE_DELAY: 500, // 500ms
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH: "auth",
  THEME: "theme",
  PREFERENCES: "preferences",
} as const;

// Query Configuration
export const QUERY_CONFIG = {
  STALE_TIME: 1000 * 60 * 5, // 5 minutes
  CACHE_TIME: 1000 * 60 * 10, // 10 minutes
  RETRY_DELAY: 1000, // 1 second
} as const;

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  DEFAULT_THEME: "light",
  THEMES: ["light", "dark", "system"],
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  TIMEOUT_ERROR: "Request timed out. Please try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  NOT_FOUND: "The requested resource was not found.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  UNKNOWN_ERROR: "An unknown error occurred.",
} as const;
