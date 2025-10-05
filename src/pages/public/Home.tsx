import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { DASHBOARD_ROUTES, PUBLIC_ROUTES } from "../../constants/routes";
import {
  Zap,
  Shield,
  Palette,
  Code,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";

export const Home = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Built with Vite for optimal performance and instant hot reload.",
    },
    {
      icon: Shield,
      title: "Type Safe",
      description:
        "Full TypeScript support with strict type checking throughout.",
    },
    {
      icon: Palette,
      title: "Beautiful UI",
      description: "Modern components built with Shadcn UI and Tailwind CSS.",
    },
    {
      icon: Code,
      title: "Developer Experience",
      description:
        "Comprehensive tooling with TanStack Query and React Router.",
    },
  ];

  const benefits = [
    "React 19 with latest features",
    "TypeScript for type safety",
    "TanStack Query for data fetching",
    "Shadcn UI components",
    "Dark mode support",
    "Responsive design",
    "Error boundaries",
    "Axios for HTTP requests",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to{" "}
          <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
            React Boilerplate
          </span>
        </h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          A comprehensive React application with TypeScript, TanStack Query,
          React Router, and Shadcn UI. Built with modern tools and best
          practices for optimal developer experience.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link to={DASHBOARD_ROUTES.HOME}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to={PUBLIC_ROUTES.ABOUT}>Learn More</Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <feature.icon className="text-primary mx-auto h-12 w-12" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>What's Included</CardTitle>
            <CardDescription>
              Everything you need to build modern React applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Get up and running in minutes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">1. Clone the repository</p>
              <p className="text-sm font-medium">2. Install dependencies</p>
              <p className="text-sm font-medium">3. Start development server</p>
              <p className="text-sm font-medium">4. Begin building!</p>
            </div>
            <Button className="w-full" asChild>
              <Link to={DASHBOARD_ROUTES.HOME}>
                View Dashboard Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
