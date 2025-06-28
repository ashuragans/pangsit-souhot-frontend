const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;
const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL;

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function registerServiceWorker() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/sw.js')
      .then(swReg => console.log('Service Worker registered successfully.', swReg))
      .catch(error => console.error('Service Worker registration failed:', error));
  } else {
    console.warn('Push messaging is not supported by this browser.');
  }
}

export async function subscribeUser() {
  if (!('serviceWorker' in navigator)) {
    alert('Notifications are not supported on this browser.');
    return false;
  }
  
  if (!VAPID_PUBLIC_KEY || !STRAPI_URL) {
    console.error("VAPID Key or Strapi URL is missing from environment variables.");
    alert("Notification service is not configured correctly.");
    return false;
  }

  try {
    const swReg = await navigator.serviceWorker.ready;

    // --- THE FIX IS HERE ---
    // First, check the current subscription status.
    const existingSubscription = await swReg.pushManager.getSubscription();
    if (existingSubscription) {
      console.log("User is already subscribed.");
      alert("You are already subscribed to notifications!");
      return true; // Indicate success as they are already subscribed
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const subscription = await swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      await fetch(`${STRAPI_URL}/api/push-subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { details: subscription } }),
      });
      
      console.log("User successfully subscribed.");
      localStorage.setItem('notificationPermission', 'granted');
      return true;
    } else {
      console.warn('User denied notification permission.');
      return false;
    }
  } catch (error) {
    console.error('Failed to subscribe the user:', error);
    alert('There was an error subscribing to notifications.');
    return false;
  }
}