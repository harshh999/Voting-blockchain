"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  X,
  ExternalLink,
  Clock,
  Shield,
  Vote,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "security";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  // Generate mock notifications
  const generateMockNotifications = (): Notification[] => {
    const now = new Date();
    return [
      {
        id: "1",
        type: "success",
        title: "Vote Successfully Cast",
        message: "Your vote in the City Council Election has been recorded on the blockchain.",
        timestamp: new Date(now.getTime() - 5 * 60 * 1000), // 5 minutes ago
        read: false,
        action: {
          label: "View Transaction",
          url: "/verify"
        }
      },
      {
        id: "2",
        type: "security",
        title: "New Login Detected",
        message: "A new login was detected from Chrome on Windows. If this wasn't you, please secure your account.",
        timestamp: new Date(now.getTime() - 30 * 60 * 1000), // 30 minutes ago
        read: false,
        action: {
          label: "Review Activity",
          url: "/dashboard"
        }
      },
      {
        id: "3",
        type: "info",
        title: "Election Starting Soon",
        message: "The School Board Referendum will begin in 2 days. Make sure you're registered to vote.",
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: true
      },
      {
        id: "4",
        type: "warning",
        title: "Election Deadline Approaching",
        message: "The City Council Election ends in 24 hours. Cast your vote before it's too late.",
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
        read: false,
        action: {
          label: "Vote Now",
          url: "/vote"
        }
      },
      {
        id: "5",
        type: "success",
        title: "Vote Verified",
        message: "Your vote has been successfully verified and recorded on the blockchain.",
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
        read: true
      }
    ];
  };

  useEffect(() => {
    const mockNotifications = generateMockNotifications();
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ["success", "info", "warning"][Math.floor(Math.random() * 3)] as "success" | "info" | "warning",
          title: "New Activity",
          message: "There's new activity in your elections.",
          timestamp: new Date(),
          read: false
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        toast({
          title: newNotification.title,
          description: newNotification.message,
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [toast]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    const removed = notifications.find(n => n.id === id);
    if (removed && !removed.read) {
      setUnreadCount(prev => prev - 1);
    }
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "security":
        return <Shield className="h-4 w-4 text-destructive" />;
      case "info":
      default:
        return <Info className="h-4 w-4 text-primary" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-96 z-50 shadow-xl border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all as read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No notifications</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-accent cursor-pointer transition-colors ${
                        !notification.read ? "bg-primary/5" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className={`font-medium text-sm ${
                                !notification.read ? "font-semibold" : ""
                              }`}>
                                {notification.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{formatTimeAgo(notification.timestamp)}</span>
                                </div>
                                {notification.action && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-6 px-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.location.href = notification.action!.url;
                                    }}
                                  >
                                    {notification.action.label}
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                  </Button>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}