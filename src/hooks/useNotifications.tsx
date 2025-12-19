import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { useToast } from '@/hooks/use-toast';

interface NotificationState {
  permission: NotificationPermission;
  supported: boolean;
}

export const useNotifications = () => {
  const [notificationState, setNotificationState] = useState<NotificationState>({
    permission: 'default',
    supported: false
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check if notifications are supported
    if ('Notification' in window) {
      setNotificationState({
        permission: Notification.permission,
        supported: true
      });
    }

    // Register service worker for web only (avoid stale cache on native)
    if (!Capacitor.isNativePlatform() && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!notificationState.supported) {
      toast({
        title: "Notifications not supported",
        description: "Your browser doesn't support notifications.",
        variant: "destructive"
      });
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationState(prev => ({ ...prev, permission }));

      if (permission === 'granted') {
        toast({
          title: "Notifications enabled!",
          description: "You'll receive timely reminders for your health actions.",
        });
        return true;
      } else {
        toast({
          title: "Notifications blocked",
          description: "Enable notifications in your browser settings for better experience.",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const scheduleNotification = (action: any, delayMinutes: number = 0) => {
    if (notificationState.permission !== 'granted') return;

    const delay = delayMinutes * 60 * 1000;
    
    setTimeout(() => {
      new Notification(`BioPrecision: ${action.urgency.toUpperCase()} Priority`, {
        body: action.instruction,
        icon: '/favicon.ico',
        tag: action.id,
        requireInteraction: action.urgency === 'high'
      });
    }, delay);
  };

  const scheduleSmartNotifications = (actions: any[]) => {
    if (notificationState.permission !== 'granted') return;

    actions.forEach(action => {
      if (action.status !== 'pending') return;

      let notificationDelay = 0;
      
      // Smart scheduling based on urgency
      switch (action.urgency) {
        case 'high':
          notificationDelay = 0; // Immediate
          // Follow-up in 5 minutes if not completed
          scheduleNotification(action, 5);
          break;
        case 'medium':
          notificationDelay = 2; // 2 minutes
          // Follow-up in 15 minutes
          scheduleNotification(action, 15);
          break;
        case 'low':
          notificationDelay = 10; // 10 minutes
          // Follow-up in 1 hour
          scheduleNotification(action, 60);
          break;
      }

      scheduleNotification(action, notificationDelay);
    });
  };

  const showInstantNotification = (title: string, body: string) => {
    if (notificationState.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        requireInteraction: false
      });
    }
  };

  return {
    notificationState,
    requestPermission,
    scheduleNotification,
    scheduleSmartNotifications,
    showInstantNotification
  };
};
