let url = window.location.href;
let swLocation = '/twitter-clone-PWA/sw.js';

if (navigator.serviceWorker) {
  if (url.includes('localhost')) {
    swLocation = '/sw.js';
  }

  //make sure to install service worker only when the page is loaded
  window.addEventListener('load', function () {
    navigator.serviceWorker.register(swLocation).then(function (reg) {
      swReg = reg;
      swReg.pushManager.getSubscription().then(verifySubscription);
    });
  });
}

//google map key
const googleMapKey = 'AIzaSyAZ7zantyAHnuNFtheMlJY1VvkRBEjvw9Y';

// jQuery references

let title = $('#title');
let newBtn = $('#new-btn');
let exitBtn = $('#exit-btn');
let cancelBtn = $('#cancel-btn');
let postBtn = $('#post-btn');
let avatarSel = $('#selection');
let timeline = $('#timeline');
let locationBtn = $('#location-btn');

let modal = $('#modal');
let modalAvatar = $('#modal-avatar');
let avatarBtns = $('.avatar-selection');
let txtMessage = $('#txtMessage');

const activatedBtn = $('.btn-notification-activated');
const deactivatedBtn = $('.btn-notification-deactivated');

const takePictureBtn = $('#take-picture-btn');
const photoBtn = $('#photo-btn');
const cameraContainer = $('.camera-container');

let latitude = null;
let longitude = null;
let photo = null;

// The user, contains the ID of the user selected
let usuario;

//start camera
const camera = new Camera($('#player')[0]);

// =====  Application logic =====

function createHTMLMessage(message, character, lat, lng, photo) {
  let content = `
    <li class="animated fadeIn fast"
        data-type="message"
        data-user="${character}"
        data-message="${message}"
        >
        <div class="avatar">
            <img src="img/avatars/${character}.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${character}</h3>
                <br/>
                ${message}`;
  if (photo) {
    content += `<br/><img class="message-photo" src="${photo}">`;
  }
  content += `</div>
            
            <div class="arrow"></div>
        </div>
    </li>
    `;

  if (latitude) {
    createMapMessage(latitude, longitude, character);
  }

  //reset lat and lng in case they were set
  latitude = null;
  longitude = null;

  $('.map-modal').remove();

  timeline.prepend(content);
  cancelBtn.click();
}

function createMapMessage(lat, lng, character) {
  let content = `
    <li class="animated fadeIn fast"
        data-type="map"
        data-user="${character}"
        data-lat="${lat}"
        data-lng="${lng}">
          <div class="avatar">
              <img src="img/avatars/${character}.jpg">
          </div>
          <div class="bubble-container">
              <div class="bubble">
                <iframe
                  width="100%"
                  height="250"
                  frameborder="0" style="border:0"
                  src="https://www.google.com/maps/embed/v1/place?key=${googleMapKey}
                    &q=${lat},${lng}" allowfullscreen>
                </iframe>
              </div>

              <div class="arrow"></div>
          </div>
      </li>
    `;
  timeline.prepend(content);
}

// Globals
function logIn(login) {
  if (login) {
    newBtn.removeClass('hidden');
    exitBtn.removeClass('hidden');
    timeline.removeClass('hidden');
    avatarSel.addClass('hidden');
    modalAvatar.attr('src', 'img/avatars/' + user + '.jpg');
  } else {
    newBtn.addClass('hidden');
    exitBtn.addClass('hidden');
    timeline.addClass('hidden');
    avatarSel.removeClass('hidden');

    title.text('Select Character');
  }
}

// Character selection
avatarBtns.on('click', function () {
  user = $(this).data('user');

  title.text('@' + user);

  logIn(true);
});

// Exit Button
exitBtn.on('click', function () {
  logIn(false);
});

// New Button Message
newBtn.on('click', function () {
  modal.removeClass('hidden');
  modal.animate(
    {
      marginTop: '-=1000px',
      opacity: 1,
    },
    200
  );
});

// Cancel Button Message
cancelBtn.on('click', function () {
  if (!modal.hasClass('hidden')) {
    modal.animate(
      {
        marginTop: '+=1000px',
        opacity: 0,
      },
      200,
      function () {
        modal.addClass('hidden');
        txtMessage.val('');
      }
    );
  }
});

// Send Message button
postBtn.on('click', function () {
  let message = txtMessage.val();
  if (message.length === 0) {
    cancelBtn.click();
    return;
  }

  let data = {
    message,
    user,
    latitude,
    longitude,
    photo,
  };

  fetch('api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => console.log('app.js', res))
    .catch((err) => console.log('app.js error:', err));

  createHTMLMessage(message, user, latitude, longitude, photo);

  photo = null;
});

// Fetch messages from server
function getmessages() {
  fetch('api')
    .then((res) => res.json())
    .then((posts) => {
      //   console.log(posts);
      posts.forEach((post) => createHTMLMessage(post.message, post.user));
    });
}

getmessages();

// Check connection status
function isOnline() {
  if (navigator.onLine) {
    // we have connection
    // console.log('online');
    $.mdtoast('Online', {
      interaction: true,
      interactionTimeout: 1000,
      actionText: 'OK!',
    });
  } else {
    // console.log('offline');
    // we don't have connection
    $.mdtoast('Offline', {
      interaction: true,
      actionText: 'OK',
      type: 'warning',
    });
  }
}

window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);

isOnline();

//Notifications
function verifySubscription(activated) {
  //   console.log(activated);

  if (activated) {
    activatedBtn.removeClass('hidden');
    deactivatedBtn.addClass('hidden');
    return;
  }
  //else

  deactivatedBtn.removeClass('hidden');
  activatedBtn.addClass('hidden');
}

function sendNotification() {
  const notificationOption = {
    body: 'This is the body of the notification',
    icon: 'img/icons/icon-72x72.png',
  };

  const n = new Notification('This is a test notification', notificationOption);

  n.onclick = () => {
    console.log('Click');
  };
}

function askForNotificationPermission() {
  if (!window.Notification) {
    console.log('Your browser does not support notifications.');
    return;
  }

  //Notifications status are granted, denied or default
  if (Notification.permission === 'granted') {
    // new Notification('Notifications are granted.');
    sendNotification();
    return;
  }

  if (
    Notification.permission !== 'denied' ||
    Notification.permission === 'default'
  ) {
    Notification.requestPermission(function (permission) {
      console.log(permission);
      if (permission === 'granted') {
        // new Notification('Notifications are granted.');
        sendNotification();
      }
    });
  }
}

// askForNotificationPermission();

// Get Key
function getPublicKey() {
  // fetch('api/key')
  //     .then( res => res.text())
  //     .then( console.log );

  return fetch('api/key')
    .then((res) => res.arrayBuffer())
    .then((key) => new Uint8Array(key)); //return array as Uint8Array
}

// getPublicKey().then(console.log);

//event for the button to deactivated notifications
deactivatedBtn.on('click', () => {
  //check if service worker is registered
  if (!swReg) return console.log('No service worker installed');

  //get the public key
  getPublicKey().then((key) => {
    swReg.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: key,
      })
      .then((res) => res.toJSON())
      .then((subscription) => {
        // console.log(subscription);

        fetch('api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription),
        })
          .then(verifySubscription)
          .catch(cancelSubscription);
      });
  });
});

//Cancel subscription
function cancelSubscription() {
  swReg.pushManager.getSubscription().then((subscription) => {
    subscription.unsubscribe().then(() => verifySubscription(false));
  });
}

activatedBtn.on('click', cancelSubscription);

//create modal map
function createMapModal(lat, lng) {
  $('.modal-map').remove();

  const content = `
    <div class="modal-map">
      <iframe
        width="100%"
        height="250"
        frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/view?key=${googleMapKey}&center=${lat},${lng}&zoom=17" allowfullscreen>
      </iframe>
    </div>
  `;

  modal.append(content);
}

//get geo location
locationBtn.on('click', () => {
  // console.log('Getting location button');
  $.mdtoast('Getting location', {
    interaction: true,
    interactionTimeout: 2000,
    actionText: 'OK!',
  });
  //check if geolocation is available
  navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    createMapModal(latitude, longitude);
  });
});

//get photo from camera
photoBtn.on('click', () => {
  console.log('initialize camera');
  cameraContainer.removeClass('hidden');

  camera.startCamera();
});

//Define button to take picture
takePictureBtn.on('click', () => {
  console.log('Take picture button');

  photo = camera.takePicture();
  camera.stopCamera();

  // console.log(photo);
});

//Share API

//confirm inf navigator support share API

if (navigator.share) {
  // console.log('navigator.share available');

  timeline.on('click', 'li', function () {
    const type = $(this).data('type');
    const message = $(this).data('message');
    const user = $(this).data('user');
    const latitude = $(this).data('latitude');
    const longitude = $(this).data('longitude');

    const shareOptions = {
      title: user,
      text: message,
    };

    if (type === 'map') {
      shareOptions.text = 'Map';
      shareOptions.url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    }

    navigation
      .share(shareOptions)
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  });
} else {
  console.log('navigator.share not available');
}
