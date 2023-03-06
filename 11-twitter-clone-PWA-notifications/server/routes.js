const express = require('express');
const router = express.Router();
const push = require('./push');

const messages = [
  {
    id: 1,
    user: 'Benito',
    message: "This is benito's message",
  },
];

//Get messages
router.get('/', (req, res) => {
  if (messages.length === 0) return res.json({ error: 'No messages' });
  res.json(messages);
});

module.exports = router;

router.post('/', (req, res) => {
  const message = {
    id: messages.length + 1,
    message: req.body.message,
    user: req.body.user,
  };

  messages.push(message);

  console.log('messages: ', messages);

  res.json({
    ok: true,
    message,
  });
});

//define post rout for /subscribe
router.post('/subscribe', (req, res) => {

  const subscription = req.body;

  push.addSubscription(subscription);

  console.log('subscription: ', subscription);

  res.json('subscribe');
});

// define GET to store subscription
router.get('/key', (req, res) => {

  const key =  push.getKey();
  res.send(key);
});

//Send PUSH notification to subscribed users this not usually done in the server
router.post('/push', (req, res) => {

  const notification = {
    title: req.body.title,
    body: req.body.body,
    user: req.body.user,
  };

  push.sendPush(notification);

  res.json(notification);
});
