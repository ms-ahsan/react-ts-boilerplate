import { publicRoutes } from "./publicRoutes";
import { dashboardRoutes } from "./dashboardRoutes";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { REDIRECT_ROUTES } from "../constants/routes";
import type { ReactNode } from "react";

// Wrapper component for protected routes
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <Navigate to={REDIRECT_ROUTES.UNAUTHORIZED} replace />;
  }

  return <>{children}</>;
};

// Combine all routes with protection
export const routes = [
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  ...publicRoutes.map((route) => ({
    ...route,
    element: route.element,
  })),
  {
    path: "/dashboard/*",
    element: <ProtectedRoute>{dashboardRoutes[0].element}</ProtectedRoute>,
    children: dashboardRoutes[0].children,
  },
];

// Export individual route groups for flexibility
export { publicRoutes, dashboardRoutes };
