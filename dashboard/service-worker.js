
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('pwa-cache').then((cache) => {
      return cache.addAll([        
        'index.html'        
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});


/* WEB PUSH NOTYFY PHP */

self.addEventListener("push", (event) => {
    const notification = event.data.json();
    // {"title":"Hi" , "body":"something amazing!" , "url":"./?message=123"}
    event.waitUntil(self.registration.showNotification(notification.title, {
        body: notification.body,
        icon: "icon.png",
        data: {
            notifURL: notification.url
        }
    }));
});

self.addEventListener("notificationclick", (event) => {
    event.waitUntil(clients.openWindow(event.notification.data.notifURL));
});

