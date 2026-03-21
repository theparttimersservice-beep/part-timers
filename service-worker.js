// The Part-Timer's — Service Worker v1.0
const CACHE = 'parttimers-v1';

const PRECACHE = [
  '/part-timers/',
  '/part-timers/index.html',
  '/part-timers/manifest.json',
];

// Install — cache core files
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE).catch(() => {}))
  );
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — network first, cache fallback
self.addEventListener('fetch', e => {
  // Skip non-GET and chrome-extension requests
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith('http')) return;

  // For Supabase API calls — network only, no cache
  if (e.request.url.includes('supabase.co')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Cache successful HTML/JS/CSS responses
        if (res.ok && (e.request.url.includes('.html') || e.request.url.includes('.js') || e.request.url.includes('.css'))) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request).then(cached =>
          cached || caches.match('/part-timers/index.html')
        )
      )
  );
});

// Push notifications (future use)
self.addEventListener('push', e => {
  const data = e.data?.json() || {};
  self.registration.showNotification(data.title || "The Part-Timer's", {
    body: data.body || 'You have a new update',
    icon: '/part-timers/icons/icon-192.png',
    badge: '/part-timers/icons/icon-72.png',
    data: { url: data.url || '/part-timers/' }
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data?.url || '/part-timers/'));
});
