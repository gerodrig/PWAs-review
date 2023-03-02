//? Confirm if we can use Service Worker SW
// console.log(navigator);
// if(navigator.serviceWorker) console.log('SW is supported');

if(navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
}