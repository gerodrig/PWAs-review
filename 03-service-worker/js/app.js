//instruction to install service worker
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    setTimeout(() => {
      registration.sync.register('github');
      console.log('Synchronizing data');
    }, 3000);
    Notification.requestPermission().then((result) => {
      console.log(result);
      if (result === 'granted') {
        console.log('User granted permission');
        registration.showNotification('Benito says hi!');
      }
    });
  });

  //check sync manager
  //Nofitication handling
}

//execute a fetch request
// (async()=>{
//     const response = await fetch('https://reqres.in/api/users');

//     const data = await response.text();

//     console.log(data);
// })();
