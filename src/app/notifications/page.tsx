"use client";

import {
  getNotifications,
  markNotificationsAsRead,
} from "@/actions/notification.action";
import { NotificationsSkeleton } from "@/components/NotificationsSkeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { HeartIcon, MessageCircleIcon, UserPlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Notifications = Awaited<ReturnType<typeof getNotifications>>;
type Notification = Notifications[number];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "LIKE":
      return <HeartIcon className="size-4 text-primary fill-current" />;
    case "COMMENT":
      return (
        <MessageCircleIcon className="size-4 text-blue-500 fill-current" />
      );
    case "FOLLOW":
      return <UserPlusIcon className="size-4 text-red-500" />;
    default:
      return null;
  }
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const data = await getNotifications();
        setNotifications(data);

        const unreadIds = data.filter((n) => !n.read).map((n) => n.id);
        if (unreadIds.length > 0) await markNotificationsAsRead(unreadIds);
      } catch (error) {
        toast.error("Failed to fetch notifications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (isLoading) return <NotificationsSkeleton />;

  return (
    <div className="space-y-4">
      <Card className="dark:border-primary/30">
        <CardHeader className="border-b dark:border-primary/30">
          <div className="flex items-center justify-between">
            <CardTitle>Notifications</CardTitle>
            <span className="text-sm dark:text-primary">
              {notifications.filter((n) => !n.read).length} unread
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-13rem)]">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 border-b hover:bg-primary/5 transition-colors ${
                    !notification.read ? "bg-primary/10" : ""
                  }`}
                >
                  <Avatar className="mt-1 border border-primary/30">
                    <AvatarImage
                      src={notification.creator.image ?? "/3davatar.png"}
                    />
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {getNotificationIcon(notification.type)}
                      <span>
                        <span
                          className={`font-medium font-mono ${
                            notification.type === "FOLLOW"
                              ? "text-red-500"
                              : notification.type === "LIKE"
                              ? "text-primary"
                              : "text-blue-500"
                          }`}
                        >
                          {notification.creator.name ??
                            notification.creator.username}
                        </span>{" "}
                        {notification.type === "FOLLOW"
                          ? "started following you"
                          : notification.type === "LIKE"
                          ? "liked your post"
                          : "commented on your post"}
                      </span>
                    </div>

                    {notification.post &&
                      (notification.type === "LIKE" ||
                        notification.type === "COMMENT") && (
                        <div className="pl-6 space-y-2">
                          {notification.type === "COMMENT" &&
                            notification.comment && (
                              <div className="text-sm p-2 bg-blue-500/10 text-blue-500 rounded-md">
                                {notification.comment.content}
                              </div>
                            )}

                          <div className="text-sm text-muted-foreground rounded-md p-3  mt-2.5 bg-primary/5">
                            <p>{notification.post.content}</p>
                            {notification.post.image && (
                              <Image
                                src={notification.post.image}
                                alt="Post content"
                                width={200}
                                height={200}
                                className="mt-2 rounded-md w-full max-w-[200px] h-auto object-cover"
                              />
                            )}
                          </div>

                          {/* {notification.type === "COMMENT" &&
                            notification.comment && (
                              <div className="text-sm p-2 bg-accent/50 rounded-md">
                                {notification.comment.content}
                              </div>
                            )} */}
                        </div>
                      )}

                    <p className="text-sm text-muted-foreground pl-6">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
