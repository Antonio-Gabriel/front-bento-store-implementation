import { v1 as uuidv1 } from 'uuid';
import { create } from 'zustand';

type NotificationType = 'info' | 'warning' | 'success' | 'error';

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
};

type NotificationsStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  dismissNotification: (id: string) => void;
};

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification(notification) {
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: uuidv1(), ...notification },
      ],
    }));
  },
  dismissNotification(id) {
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  },
}));
