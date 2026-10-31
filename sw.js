const C='tvs-pdf-v2';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','icon-v2-192.png','icon-v2-512.png','manifest.json'])))});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const u=e.request.url;if(e.request.method!=='GET'||u.includes('translate.googleapis'))return;
 const same=new URL(u).origin===location.origin,net=()=>fetch(e.request).then(r=>{if(r.ok||r.type==='opaque'){const x=r.clone();caches.open(C).then(c=>c.put(e.request,x))}return r});
 e.respondWith(same?net().catch(()=>caches.match(e.request)):caches.match(e.request).then(m=>m||net()))});
