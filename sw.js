/* 古い住所のオフライン用の仕組みを自分で外す（アプリは kore-kutte/ に引っ越した）。
   キャッシュは新しい住所のアプリと同じ場所に入っているので、ここでは消さない。 */
self.addEventListener("install", function(){ self.skipWaiting(); });
self.addEventListener("activate", function(ev){
  ev.waitUntil(self.registration.unregister());
});
