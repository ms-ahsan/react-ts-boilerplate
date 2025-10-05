import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import {
  PUBLIC_NAV_ITEMS,
  DASHBOARD_ROUTES,
  PUBLIC_ROUTES,
} from "../../constants/routes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Header = () => {
  const location = useLocation();
  const { authState, logout } = useAuth();
  const { setTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        <Link
          to={PUBLIC_ROUTES.HOME}
          className="mr-6 flex items-center space-x-2"
        >
          <span className="hidden font-bold sm:inline-block">
            React Boilerplate
          </span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {PUBLIC_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`hover:text-foreground/80 transition-colors ${
                isActive(item.href) ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {authState.isAuthenticated && (
            <Link
              to={DASHBOARD_ROUTES.HOME}
              className={`hover:text-foreground/80 transition-colors ${
                isActive(DASHBOARD_ROUTES.HOME)
                  ? "text-foreground"
                  : "text-foreground/60"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {authState.isAuthenticated ? (
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button asChild>
              <Link to={PUBLIC_ROUTES.LOGIN}>Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
