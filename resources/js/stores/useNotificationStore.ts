import { create } from 'zustand';
import { Notification } from '@/types/notification';

interface NotificationState {
  notifications: Notification[];
  removeNotification: (id: string) => void;
  addNotification: (notification: Notification) => void;
  // ...他のstateやaction...
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification]
  })),
  // ...他のaction...
}));

// ラッパー関数としてshowNotificationを追加
export function showNotification(notification: Notification) {
  useNotificationStore.getState().addNotification(notification);
}
