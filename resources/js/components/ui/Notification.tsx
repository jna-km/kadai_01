import React, { useEffect } from 'react';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { Transition } from './Transition';

const NotificationItem: React.FC<{ id: string; type: string; message: string; onClose: (id: string) => void }> = ({ id, type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id]); // onCloseはstoreの関数なので依存不要

  const bgColor = type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded shadow-lg ${bgColor}`} role="alert">
      <span className="text-sm">{message}</span>
      <button
        onClick={() => onClose(id)}
        aria-label="閉じる"
        className="ml-4 text-lg font-bold hover:opacity-80"
      >
        ×
      </button>
    </div>
  );
};

const Notification: React.FC = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore((state) => state.removeNotification);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 space-y-3 w-80">
      {notifications.map((n) => (
        <Transition key={n.id} show={true}>
          <NotificationItem
            id={n.id}
            type={n.type}
            message={n.message}
            onClose={removeNotification}
          />
        </Transition>
      ))}
    </div>
  );
};

export default Notification;
