const express = require('express');
const router = express.Router();

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
