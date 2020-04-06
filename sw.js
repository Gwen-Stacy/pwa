// asignar un nombre y una version de cache
const CACHE_NAME = 'v1_cache_victor_robles_pwa';

// Ficheros a cachear en la aplicacion
var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png'
];

// Eventos install
// instalacion del service worker
// self = variable del service worker u guardar en cache los recursos estaticos
self.addEventListener('install', e=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            .then(() => {
                self.skipWaiting();
            });
        }).catch(err => console.log('No se ah registrado el cache', err))
    );
});
// Evento activate
// para que la aplicacion funcione offline
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                // recorrer todos los elementos de la cache que existen
                cacheNames.map(cacheName => {
                    if(cacheWhiteList.indexOf(cacheName) === -1){
                        // borrar elementos que no necesitamos
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            self.clients.claim();
        })
    );
});

// Evento FETCH
// se ejecuta este evento cuando el navegador recupera datos de una url
// 
self.addEventListener('fetch', e => {
    // e.respondWith - responde con datos de la cache
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res) {
                // si da true significa que ya esta en cache
                // devuelvo datos desde cache
                return res;
            }
            // 
            return fetch(e.request);
        })
    )
})