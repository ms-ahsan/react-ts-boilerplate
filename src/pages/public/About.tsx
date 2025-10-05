import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import {
  Code,
  Database,
  Palette,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Layers,
} from "lucide-react";

export const About = () => {
  const techStack = [
    {
      name: "React 19",
      icon: Code,
      description: "Latest React with concurrent features",
    },
    {
      name: "TypeScript",
      icon: Shield,
      description: "Type safety and better DX",
    },
    { name: "Vite", icon: Zap, description: "Fast build tool and dev server" },
    {
      name: "Tailwind CSS",
      icon: Palette,
      description: "Utility-first CSS framework",
    },
    {
      name: "Shadcn UI",
      icon: Layers,
      description: "Beautiful and accessible components",
    },
    {
      name: "TanStack Query",
      icon: Database,
      description: "Powerful data fetching",
    },
    { name: "React Router", icon: Globe, description: "Client-side routing" },
    {
      name: "Axios",
      icon: Smartphone,
      description: "HTTP client with interceptors",
    },
  ];

  const features = [
    "Modern React 19 with hooks and concurrent features",
    "Full TypeScript implementation",
    "Responsive design with mobile-first approach",
    "Dark mode support with system detection",
    "Protected routes with authentication",
    "Error boundaries and error handling",
    "Loading states and skeleton screens",
    "Toast notifications for user feedback",
    "Axios interceptors for API calls",
    "Query caching and background refetching",
    "Component composition patterns",
    "Clean and maintainable code structure",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter">
            About This Project
          </h1>
          <p className="text-muted-foreground text-xl">
            A comprehensive React boilerplate with modern tools and best
            practices.
          </p>
        </div>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>
              Built with the latest and greatest tools in the React ecosystem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 rounded-lg border p-3"
                >
                  <tech.icon className="text-primary mt-0.5 h-5 w-5" />
                  <div>
                    <h4 className="font-medium">{tech.name}</h4>
                    <p className="text-muted-foreground text-sm">
                      {tech.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
            <CardDescription>
              Everything you need to build production-ready applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    ✓
                  </Badge>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Architecture */}
        <Card>
          <CardHeader>
            <CardTitle>Project Architecture</CardTitle>
            <CardDescription>
              Clean and scalable structure with separation of concerns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="mb-2 font-medium">Component Organization</h4>
              <p className="text-muted-foreground text-sm">
                Components are organized by feature and shared components with
                clear separation between UI, layout, and business logic.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="mb-2 font-medium">State Management</h4>
              <p className="text-muted-foreground text-sm">
                Server state managed with TanStack Query, client state with
                React hooks, and authentication state with custom hooks.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="mb-2 font-medium">API Layer</h4>
              <p className="text-muted-foreground text-sm">
                Centralized API configuration with Axios, including
                interceptors, error handling, and retry logic.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="mb-2 font-medium">Routing</h4>
              <p className="text-muted-foreground text-sm">
                Protected routes with role-based access, lazy loading for code
                splitting, and centralized route configuration.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
