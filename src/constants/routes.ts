// Public routes
export const PUBLIC_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  LOGIN: "/login",
  NOT_FOUND: "*",
} as const;

// Dashboard routes
export const DASHBOARD_ROUTES = {
  ROOT: "/dashboard",
  HOME: "/dashboard",
  USERS: "/dashboard/users",
  USER_PROFILE: (id: string | number) => `/dashboard/users/${id}`,
  POSTS: "/dashboard/posts",
} as const;

// Combined routes object for easy access
export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...DASHBOARD_ROUTES,
} as const;

// Route labels for navigation
export const ROUTE_LABELS = {
  [PUBLIC_ROUTES.HOME]: "Home",
  [PUBLIC_ROUTES.ABOUT]: "About",
  [PUBLIC_ROUTES.LOGIN]: "Login",
  [DASHBOARD_ROUTES.HOME]: "Dashboard",
  [DASHBOARD_ROUTES.USERS]: "Users",
  [DASHBOARD_ROUTES.POSTS]: "Posts",
} as const;

// Navigation items for public routes
export const PUBLIC_NAV_ITEMS = [
  {
    href: PUBLIC_ROUTES.HOME,
    label: ROUTE_LABELS[PUBLIC_ROUTES.HOME],
  },
  {
    href: PUBLIC_ROUTES.ABOUT,
    label: ROUTE_LABELS[PUBLIC_ROUTES.ABOUT],
  },
] as const;

// Navigation items for dashboard
export const DASHBOARD_NAV_ITEMS = [
  {
    href: DASHBOARD_ROUTES.HOME,
    label: ROUTE_LABELS[DASHBOARD_ROUTES.HOME],
    icon: "LayoutDashboard",
  },
  {
    href: DASHBOARD_ROUTES.USERS,
    label: ROUTE_LABELS[DASHBOARD_ROUTES.USERS],
    icon: "Users",
  },
  {
    href: DASHBOARD_ROUTES.POSTS,
    label: ROUTE_LABELS[DASHBOARD_ROUTES.POSTS],
    icon: "FileText",
  },
] as const;

// Route protection
export const PROTECTED_ROUTES = [
  DASHBOARD_ROUTES.HOME,
  DASHBOARD_ROUTES.USERS,
  DASHBOARD_ROUTES.USER_PROFILE(":id"),
  DASHBOARD_ROUTES.POSTS,
] as const;

// Redirect routes
export const REDIRECT_ROUTES = {
  UNAUTHORIZED: PUBLIC_ROUTES.LOGIN,
  NOT_FOUND: PUBLIC_ROUTES.NOT_FOUND,
} as const;
