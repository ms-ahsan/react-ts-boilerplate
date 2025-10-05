import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { DASHBOARD_NAV_ITEMS, DASHBOARD_ROUTES } from "../../constants/routes";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";

const iconMap = {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
};

export const Sidebar = () => {
  const location = useLocation();
  const { authState, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const NavContent = () => (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link
          to={DASHBOARD_ROUTES.HOME}
          className="flex items-center gap-2 font-semibold"
        >
          <span className="">Dashboard</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {DASHBOARD_NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  location.pathname === item.href ||
                    (item.href.includes(":id") &&
                      location.pathname.startsWith("/dashboard/users/"))
                    ? "bg-muted text-primary"
                    : "transparent",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="flex items-center gap-2 pt-2 pb-4">
          <div className="text-muted-foreground grid flex-1 text-sm">
            <span className="font-medium">{authState.user?.name}</span>
            <span className="text-xs">{authState.user?.email}</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="bg-muted/40 hidden border-r md:block">
        <NavContent />
      </div>
    </>
  );
};
