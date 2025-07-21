'use client';

import React from 'react';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: number;
}

interface NotificationCenterProps {
  notifications: Notification[];
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications }) => {
  if (notifications.length === 0) return null;

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getNotificationColor(notification.type)} text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-top-2`}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
