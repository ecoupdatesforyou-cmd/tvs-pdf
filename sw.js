const C='tvs-pdf-v3';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','icon-v2-192.png','icon-v2-512.png','manifest.json'])))});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request,u=r.url;
 if(r.method==='POST'&&new URL(u).pathname.endsWith('/share-target')){
  e.respondWith((async()=>{try{const f=(await r.formData()).get('pdf');if(f){const c=await caches.open('tvs-share');await c.put('shared-pdf',new Response(f,{headers:{'X-Name':encodeURIComponent(f.name||'shared.pdf')}}))}}catch(x){}
   return Response.redirect(new URL('./?shared=1',self.registration.scope).href,303)})());return}
 if(r.method!=='GET'||u.includes('translate.googleapis'))return;
 const same=new URL(u).origin===location.origin,net=()=>fetch(r).then(x=>{if(x.ok||x.type==='opaque'){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x});
 e.respondWith(same?net().catch(()=>caches.match(r)):caches.match(r).then(m=>m||net()))});
