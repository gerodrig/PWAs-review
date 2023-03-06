const fs = require('fs');

const vapid = require('./vapid.json');
const urlSafeBase64 = require('urlsafe-base64');
const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:garc@outlook.com',
  vapid.publicKey,
  vapid.privateKey
);

let subscriptions = require('./subs-db.json') || [];

module.exports.getKey = () => {
  return urlSafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (subscription) => {
  subscriptions.push(subscription);

  //save in a file
  fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(subscriptions));
};

module.exports.sendPush = (post) => {

    let notificationsSent = [];

  subscriptions.forEach((sub, i) => {
    const pushProm = webpush.sendNotification(sub, JSON.stringify(post)).catch((err) => {

        if(err.statusCode === 410){
            subscriptions[i].delete = true;
        }
    });

    notificationsSent.push(pushProm);
  });

    Promise.all(sendNotification).then(() => {
        subscriptions = subscriptions.filter(sub => sub.delete !== true);
        fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(subscriptions));
    });
};
