import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { getRandomUsers } from "@/actions/user.action";
import FollowButton from "./FollowButton";

const WhoToFollow = async () => {
  const users = await getRandomUsers();

  if (users.length === 0) return null;

  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex gap-2 items-center justify-between "
            >
              <div className="flex items-center gap-2">
                <Link href={`/profile/${user.username}`}>
                  <Avatar className="border border-primary/30">
                    <AvatarImage src={user.image ?? "/3davatar.png"} />
                  </Avatar>
                </Link>
                <div className="text-xs">
                  <Link
                    href={`/profile/${user.username}`}
                    className="font-medium font-mono cursor-pointer"
                  >
                    {user.name}
                  </Link>
                  <p className="text-base font-mono">@{user.username}</p>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {user._count.followers} followers
                  </p>
                </div>
              </div>
              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WhoToFollow;
