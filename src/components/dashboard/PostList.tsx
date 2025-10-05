import { useAllPosts, useDeletePost } from "../../hooks/useApi";
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
import { Post } from "../../types";
import { Link } from "react-router-dom";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { User, Calendar, Trash2, RefreshCw, Eye } from "lucide-react";
import { format } from "date-fns";

export const PostList = () => {
  const { data: posts, isLoading, error, refetch } = useAllPosts();
  const deletePostMutation = useDeletePost();

  const handleDelete = (postId: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostMutation.mutate(postId);
    }
  };

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
        <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {posts?.map((post: Post) => (
          <Card key={post.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId}`}
                    />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription className="mt-1 flex items-center">
                      <User className="mr-1 h-3 w-3" />
                      User ID: {post.userId}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Post #{post.id}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                    disabled={deletePostMutation.isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{post.body}</p>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground flex items-center text-sm">
                  <Calendar className="mr-1 h-3 w-3" />
                  {format(new Date(), "MMM dd, yyyy")}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={DASHBOARD_ROUTES.USER_PROFILE(post.userId)}>
                    <Eye className="mr-1 h-3 w-3" />
                    View Author
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
