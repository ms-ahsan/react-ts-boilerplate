import { Outlet } from "react-router-dom";
import { Header } from "../common/Header";
import { Toaster } from "../ui/sonner";

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t py-6">
        <div className="text-muted-foreground container mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} React Boilerplate. All rights reserved.
        </div>
      </footer>
      <Toaster />
    </div>
  );
};
