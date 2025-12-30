"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Bell, AlertCircle, CheckCircle2, DollarSign, CreditCard } from "lucide-react";
import { notificationAPI } from "@/lib/api";

interface Notification {
  _id: string;
  userId: string;
  type: "installment" | "commission" | "followup" | "alert" | "lead" | "sale";
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

const iconMap = {
  installment: CreditCard,
  commission: DollarSign,
  followup: Bell,
  alert: AlertCircle,
  lead: Bell,
  sale: CheckCircle2,
};

const colorMap = {
  installment: "bg-blue-100 text-blue-800",
  commission: "bg-green-100 text-green-800",
  followup: "bg-yellow-100 text-yellow-800",
  alert: "bg-red-100 text-red-800",
  lead: "bg-purple-100 text-purple-800",
  sale: "bg-green-100 text-green-800",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationAPI.getMyNotifications();
      setNotifications(response.data || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationAPI.markAsRead(id);
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffMs = now.getTime() - notifDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Notifications</h1>
            <p className="text-[#3A3C40] mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 bg-white border border-[#E7EAEF] rounded-xl text-sm font-medium text-[#3A3C40] hover:bg-[#FAFAFA] transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>
      </AnimatedSection>

      {/* Notifications List */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardContent className="p-0 divide-y divide-[#E7EAEF]">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = iconMap[notification.type as keyof typeof iconMap] || Bell;
                return (
                  <div
                    key={notification._id}
                    className={`p-4 hover:bg-[#FAFAFA] transition-colors cursor-pointer ${
                      !notification.read ? "bg-blue-50/50" : ""
                    }`}
                    onClick={() => !notification.read && handleMarkAsRead(notification._id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-xl ${colorMap[notification.type as keyof typeof colorMap] || 'bg-gray-100 text-gray-800'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-[#111111]">{notification.title}</p>
                            <p className="text-sm text-[#3A3C40] mt-1">{notification.message}</p>
                            <p className="text-xs text-[#3A3C40]/60 mt-2">
                              {getTimeAgo(notification.createdAt)}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-[#6139DB] flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        {notification.link && (
                          <a 
                            href={notification.link}
                            className="mt-3 inline-block text-sm text-[#6139DB] font-medium hover:underline"
                          >
                            View Details →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}

