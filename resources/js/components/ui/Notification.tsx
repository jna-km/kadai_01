import React, { useEffect } from 'react';
import { useNotificationStore } from '@/stores/useNotificationStore';

const Notification: React.FC = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore((state) => state.removeNotification);

  useEffect(() => {
    const timers = notifications.map((n) =>
      setTimeout(() => {
        removeNotification(n.id);
      }, 5000)
    );
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 space-y-3 w-80">
      {notifications.map((n) => {
        const bgColor =
          n.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
        return (
          <div
            key={n.id}
            className={`flex items-center justify-between px-4 py-3 rounded shadow-lg ${bgColor}`}
          >
            <span className="text-sm">{n.message}</span>
            <button
              onClick={() => removeNotification(n.id)}
              aria-label="閉じる"
              className="ml-4 text-lg font-bold hover:opacity-80"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
