// KalaKomppis service worker: offline-tuki.
// - Sovellus (index.html, config.js): verkko ensin, välimuisti varalla -> päivitykset näkyvät heti, kun verkko toimii.
// - Versioidut kirjastot (Firebase, Leaflet, fontit): välimuisti ensin.
// - Kaikki muu (Firestore, kirjautuminen, sää, haku, karttatiilet): ei kosketa, menee suoraan verkkoon.
// Nosta VERSIOta vain, jos haluat tyhjentää vanhat välimuistit.
const VERSION = 'kk-v1';
const APP = VERSION + '-app';
const LIB = VERSION + '-lib';

const SHELL = ['./', 'index.html', 'config.js', 'manifest.json', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'tietosuoja.html'];

const LIB_HOSTS = ['www.gstatic.com', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(APP);
    // Yksi kerrallaan, ettei yksi puuttuva tiedosto kaada koko asennusta.
    await Promise.all(SHELL.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keep = [APP, LIB];
    for (const k of await caches.keys()) if (!keep.includes(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);

  // Oma sivusto: sivu ja config verkosta ensin.
  if (u.origin === location.origin) {
    if (r.mode === 'navigate') return e.respondWith(networkFirst(r, 'index.html'));
    if (u.pathname.endsWith('/config.js') || u.pathname.endsWith('/tietosuoja.html')) return e.respondWith(networkFirst(r));
    if (/\.(png|json)$/.test(u.pathname)) return e.respondWith(cacheFirst(r, APP));
    return;
  }

  // Versioidut kirjastot.
  if (LIB_HOSTS.includes(u.hostname)) {
    if (u.hostname === 'www.gstatic.com' && !u.pathname.startsWith('/firebasejs/')) return;
    if (u.hostname === 'fonts.googleapis.com') return e.respondWith(staleWhileRevalidate(r, LIB));
    return e.respondWith(cacheFirst(r, LIB));
  }
  // Muut osoitteet: ei käsitellä.
});

async function networkFirst(req, fallbackKey) {
  const c = await caches.open(APP);
  try {
    const res = await withTimeout(fetch(req), 5000);
    if (res && res.ok) c.put(fallbackKey || req, res.clone());
    return res;
  } catch (err) {
    const hit = await c.match(fallbackKey || req, { ignoreSearch: true }) || await c.match('./');
    if (hit) return hit;
    throw err;
  }
}

async function cacheFirst(req, name) {
  const c = await caches.open(name);
  const hit = await c.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
  return res;
}

async function staleWhileRevalidate(req, name) {
  const c = await caches.open(name);
  const hit = await c.match(req);
  const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; }).catch(() => hit);
  return hit || net;
}

function withTimeout(p, ms) {
  return new Promise((ok, no) => { const t = setTimeout(() => no(new Error('timeout')), ms); p.then(v => { clearTimeout(t); ok(v); }, e => { clearTimeout(t); no(e); }); });
}
