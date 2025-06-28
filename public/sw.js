self.addEventListener('push', event => {
  try {
    const data = event.data.json();

    // --- THE FIX IS HERE ---
    // We build the options object safely, only including the image
    // if a valid URL was provided in the payload.
    const options = {
      body: data.body,
      icon: data.icon || '/vite.svg', // Use a default icon if none is provided
      badge: '/vite.svg',
    };

    if (data.image) {
      options.image = data.image;
    }

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  } catch (error) {
    console.error('Error handling push notification:', error);
    // As a fallback, show a simple notification
    event.waitUntil(
      self.registration.showNotification("You have a new message")
    );
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  // This can be changed to focus a window or open a specific URL
  event.waitUntil(clients.openWindow('http://localhost:5173')); // Use your dev URL for testing
});