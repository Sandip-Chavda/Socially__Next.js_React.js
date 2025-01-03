import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { getUserByClerkId } from "@/actions/user.action";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { LinkIcon, MapPinIcon } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";

const Sidebar = async () => {
  const authUser = await currentUser();
  if (!authUser) return <UnAuthenticatedSidebar />;

  const user = await getUserByClerkId(authUser.id);
  if (!user) return null;

  return (
    <div className="sticky top-20">
      <Card className="dark:border-primary/30">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="w-24 h-24 border-2 border-primary/30 ">
                <AvatarImage src={user.image || "/avatar.png"} />
              </Avatar>

              <div className="mt-4">
                <h3 className="font-semibold font-mono">{user.name}</h3>
                <p className="text-lg font-medium font-mono">
                  @{user.username}
                </p>
              </div>
            </Link>

            {user.bio && (
              <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
            )}

            <div className="w-full">
              <Separator className="my-4 dark:bg-primary/30" />
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <Separator
                  orientation="vertical"
                  className="dark:bg-primary/30"
                />
                <div>
                  <p className="font-medium">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              <Separator className="my-4 dark:bg-primary/30" />
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {user.location || "No location Added"}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                {user.website ? (
                  <a
                    href={`${user.website}`}
                    className="hover:underline truncate"
                    target="_blank"
                  >
                    {user.website}
                  </a>
                ) : (
                  "No website Added"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;

const UnAuthenticatedSidebar = () => {
  return (
    <div className="sticky top-20">
      <Card className="dark:border-primary/30">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            Login to access your profile and connect with others.
          </p>
          <SignUpButton mode="modal">
            <Button className="w-full" variant="outline">
              Sign Up
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button className="w-full mt-4" variant="default">
              Login
            </Button>
          </SignInButton>
        </CardContent>
      </Card>
    </div>
  );
};
