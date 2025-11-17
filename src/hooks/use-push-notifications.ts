
'use client';
import { useState, useEffect } from 'react';

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

export function usePushNotifications() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

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
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''),
      });

      // TODO: Send the subscription object to your backend server
      console.log('Push subscription:', sub);
      
      setSubscription(sub);
      setIsSubscribed(true);
      
      // For demonstration, let's show a notification.
      registration.showNotification('UGO AI Studio', {
        body: 'You are now subscribed to notifications!',
        icon: '/logo.svg',
      });

    } catch (err) {
      console.error('Failed to subscribe to push notifications:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred.'));
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
       }
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          subscribeToNotifications();
        }
      });
    }
  };

  return {
    requestNotificationPermission,
    isSubscribed,
    subscription,
    error,
  };
}
