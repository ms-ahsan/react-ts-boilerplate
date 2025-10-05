import { lazy } from "react";
import { DASHBOARD_ROUTES } from "../constants/routes";

// Lazy load components for code splitting
const DashboardHome = lazy(
  () => import("../components/dashboard/DashboardHome"),
);
const UserList = lazy(() => import("../components/dashboard/UserList"));
const UserProfile = lazy(() => import("../components/dashboard/UserProfile"));
const PostList = lazy(() => import("../components/dashboard/PostList"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

export const dashboardRoutes = [
  {
    path: DASHBOARD_ROUTES.ROOT,
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: DASHBOARD_ROUTES.USERS.replace(DASHBOARD_ROUTES.ROOT + "/", ""),
        element: <UserList />,
      },
      {
        path: "users/:userId",
        element: <UserProfile />,
      },
      {
        path: DASHBOARD_ROUTES.POSTS.replace(DASHBOARD_ROUTES.ROOT + "/", ""),
        element: <PostList />,
      },
    ],
  },
] as const;
