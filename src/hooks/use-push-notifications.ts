
'use client';
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

// This function is needed to convert the VAPID public key to a Uint8Array
const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

// Store timeout IDs in a global scope to manage them across re-renders
let notificationTimeoutId: NodeJS.Timeout | null = null;

export function usePushNotifications() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(sub => {
          if (sub) {
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
      });
    }
  }, []);

  const subscribeToNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setError(new Error('Push notifications are not supported in this browser.'));
      toast({
        variant: 'destructive',
        title: 'Unsupported Browser',
        description: 'Push notifications are not supported here.',
      });
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''),
      });
      
      console.log('Push subscription:', sub);
      setSubscription(sub);
      setIsSubscribed(true);
      
      toast({
        title: 'Subscribed!',
        description: 'You are now subscribed to notifications!',
      });

      registration.showNotification('UGO AI Studio', {
        body: 'You are now subscribed to notifications!',
        icon: '/logo.svg',
      });

    } catch (err) {
      console.error('Failed to subscribe to push notifications:', err);
      const castedError = err instanceof Error ? err : new Error('An unknown error occurred.');
      setError(castedError);
      toast({
        variant: 'destructive',
        title: 'Subscription Failed',
        description: castedError.message,
      });
    }
  };

  const requestNotificationPermission = () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
      return;
    }

    if (Notification.permission === 'granted') {
       if (!isSubscribed) {
        subscribeToNotifications();
       } else {
         toast({
          title: 'Already Subscribed',
          description: 'You are already subscribed to notifications.',
         })
       }
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          subscribeToNotifications();
        }
      });
    } else {
        toast({
            variant: 'destructive',
            title: 'Permission Denied',
            description: 'You have blocked notifications. Please enable them in your browser settings.',
        });
    }
  };

  const scheduleDailyNotification = (hours: number, minutes: number) => {
    cancelDailyNotifications(); // Clear any existing scheduled notification

    const schedule = () => {
      const now = new Date();
      const notificationTime = new Date();
      notificationTime.setHours(hours, minutes, 0, 0);

      let delay = notificationTime.getTime() - now.getTime();

      if (delay < 0) {
        // If the time has already passed for today, schedule it for tomorrow
        notificationTime.setDate(notificationTime.getDate() + 1);
        delay = notificationTime.getTime() - now.getTime();
      }

      console.log(`Scheduling notification in ${delay / 1000 / 60} minutes.`);
      
      notificationTimeoutId = setTimeout(() => {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('UGO AI Studio Daily Reminder', {
            body: "Don't forget to check in on your AI projects!",
            icon: '/logo.svg',
            tag: 'daily-reminder',
          });
          // Reschedule for the next day
          schedule();
        });
      }, delay);
      
      localStorage.setItem('notificationTime', `${hours}:${minutes}`);
    };
    
    schedule();
  };

  const cancelDailyNotifications = () => {
    if (notificationTimeoutId) {
      clearTimeout(notificationTimeoutId);
      notificationTimeoutId = null;
    }
     localStorage.removeItem('notificationTime');
     // Also try to close any existing visible notification
     navigator.serviceWorker.ready.then(registration => {
        registration.getNotifications({ tag: 'daily-reminder' }).then(notifications => {
          notifications.forEach(notification => notification.close());
        });
      });
  };

  const getScheduledTime = () => {
    return localStorage.getItem('notificationTime');
  }

  const initializeScheduledNotification = () => {
    const time = getScheduledTime();
    if(time && isSubscribed) {
      const [hours, minutes] = time.split(':').map(Number);
      scheduleDailyNotification(hours, minutes);
    }
  }

  return {
    requestNotificationPermission,
    isSubscribed,
    subscription,
    error,
    scheduleDailyNotification,
    cancelDailyNotifications,
    getScheduledTime,
    initializeScheduledNotification,
  };
}
