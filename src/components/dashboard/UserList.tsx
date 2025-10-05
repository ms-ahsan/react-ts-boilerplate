import { useUsers } from "../../hooks/useApi";
import { Loading } from "../common/Loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "../../types";
import { Link } from "react-router-dom";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { Mail, Phone, Globe, RefreshCw } from "lucide-react";

export const UserList = () => {
  const { data: users, isLoading, error, refetch } = useUsers();

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive mb-4">{error.message}</p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((user: User) => (
          <Card key={user.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-muted-foreground flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4" />
                  {user.email}
                </div>
                <div className="text-muted-foreground flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4" />
                  {user.phone}
                </div>
                <div className="text-muted-foreground flex items-center text-sm">
                  <Globe className="mr-2 h-4 w-4" />
                  {user.website}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="secondary">Active</Badge>
                  <Button asChild size="sm">
                    <Link to={DASHBOARD_ROUTES.USER_PROFILE(user.id)}>
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
