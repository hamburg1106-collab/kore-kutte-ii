/* オフラインでも起動できるようにするための仕組み。
   アプリのファイルを更新したら CACHE_NAME の数字を1つ増やす。 */

const CACHE_NAME = "korekutte-v5";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", (ev) => {
  ev.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (ev) => {
  ev.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (ev) => {
  const req = ev.request;

  // GET以外と、GeminiやFirebaseへの通信はキャッシュしない
  if (req.method !== "GET") return;
  if (!req.url.startsWith(self.location.origin)) return;

  ev.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).catch(() => caches.match("./index.html"));
    })
  );
});
