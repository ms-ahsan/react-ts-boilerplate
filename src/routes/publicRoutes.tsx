import { lazy } from "react";
import { PUBLIC_ROUTES } from "../constants/routes";

// Lazy load components for code splitting
const Home = lazy(() =>
  import("../pages/public/Home").then((module) => ({
    default: module.Home,
  })),
);
const About = lazy(() =>
  import("../pages/public/About").then((module) => ({
    default: module.About,
  })),
);
const LoginForm = lazy(() =>
  import("../components/auth/LoginForm").then((module) => ({
    default: module.LoginForm,
  })),
);
const NotFound = lazy(() =>
  import("../pages/public/NotFound").then((module) => ({
    default: module.NotFound,
  })),
);

export const publicRoutes = [
  {
    path: PUBLIC_ROUTES.HOME,
    element: <Home />,
  },
  {
    path: PUBLIC_ROUTES.ABOUT,
    element: <About />,
  },
  {
    path: PUBLIC_ROUTES.LOGIN,
    element: <LoginForm />,
  },
  {
    path: PUBLIC_ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
] as const;
