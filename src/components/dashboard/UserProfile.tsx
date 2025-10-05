import { useState } from "react";
import { useUser, useUserPosts, useCreatePost } from "../../hooks/useApi";
import { useParams, useNavigate } from "react-router-dom";
import { Loading } from "../common/Loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Post } from "../../types";

import { DASHBOARD_ROUTES } from "../../constants/routes";
import {
  Mail,
  Phone,
  Globe,
  Building,
  MapPin,
  Calendar,
  FileText,
  Plus,
  ArrowLeft,
} from "lucide-react";

export const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useUser(Number(userId));
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useUserPosts(Number(userId));
  const createPostMutation = useCreatePost();

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostBody.trim()) return;

    createPostMutation.mutate({
      userId: Number(userId),
      title: newPostTitle,
      body: newPostBody,
    });
  };

  if (userLoading || postsLoading) return <Loading />;

  if (userError || postsError) {
    const error = userError || postsError;
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive mb-4">{error.message}</p>
          <Button onClick={() => navigate(DASHBOARD_ROUTES.USERS)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
        <Button
          variant="outline"
          onClick={() => navigate(DASHBOARD_ROUTES.USERS)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="mx-auto h-20 w-20">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
              />
              <AvatarFallback className="text-lg">
                {user?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{user?.name}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
            <Badge variant="secondary" className="mx-auto w-fit">
              Active
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="text-muted-foreground mr-2 h-4 w-4" />
                <span className="text-muted-foreground">Email:</span>
                <span className="ml-auto">{user?.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="text-muted-foreground mr-2 h-4 w-4" />
                <span className="text-muted-foreground">Phone:</span>
                <span className="ml-auto">{user?.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <Globe className="text-muted-foreground mr-2 h-4 w-4" />
                <span className="text-muted-foreground">Website:</span>
                <span className="ml-auto">{user?.website}</span>
              </div>
              <div className="flex items-center text-sm">
                <Building className="text-muted-foreground mr-2 h-4 w-4" />
                <span className="text-muted-foreground">Company:</span>
                <span className="ml-auto">{user?.company?.name}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="text-muted-foreground mr-2 h-4 w-4" />
                <span className="text-muted-foreground">Location:</span>
                <span className="ml-auto">{user?.address?.city}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
                <span className="text-muted-foreground">Member Since:</span>
                <span className="ml-auto">Jan 2023</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Posts</CardTitle>
                  <CardDescription>Posts created by this user</CardDescription>
                </div>
                <Button onClick={() => setIsCreatingPost(true)} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isCreatingPost && (
                <form
                  onSubmit={handleCreatePost}
                  className="mb-6 space-y-4 rounded-lg border p-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Post title"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="body">Body</Label>
                    <Textarea
                      id="body"
                      placeholder="Post content"
                      rows={4}
                      value={newPostBody}
                      onChange={(e) => setNewPostBody(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="submit"
                      disabled={createPostMutation.isPending}
                    >
                      {createPostMutation.isPending
                        ? "Creating..."
                        : "Create Post"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreatingPost(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {posts && posts.length > 0 ? (
                  posts.map((post: Post) => (
                    <Card key={post.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {post.title}
                          </CardTitle>
                          <Badge variant="outline">Post #{post.id}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{post.body}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <FileText className="text-muted-foreground mx-auto h-12 w-12" />
                    <p className="text-muted-foreground mt-2">No posts found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
