import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { routes } from "./routes";
import { Loading } from "./components/common/Loading";
import { ErrorBoundary } from "./components/common/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes with AppLayout */}
          <Route path="/" element={<AppLayout />}>
            {routes.map((route, index) => {
              if (route.path.startsWith("/dashboard")) return null;

              return (
                <Route key={index} path={route.path} element={route.element} />
              );
            })}
          </Route>

          {/* Dashboard Routes with DashboardLayout */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {routes.map((route, index) => {
              if (!route.path.startsWith("/dashboard")) return null;

              if (route.children) {
                return route.children.map((child, childIndex) => (
                  <Route
                    key={`${index}-${childIndex}`}
                    path={child.path}
                    element={child.element}
                  />
                ));
              }

              return null;
            })}
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
