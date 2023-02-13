const { App } = require('@slack/bolt');
const express = require('express');
require('dotenv').config()


const app = express();

const bolt = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: false,
  appToken: process.env.SLACK_APP_TOKEN,
  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: process.env.PORT || 3000
});

// Listens to incoming messages that contain "hello"
bolt.message('hello', async ({ message, say }) => {
  console.log('message');
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

app.post('/slack/events', (req, res) => {
  console.log('SLACK EVENTS')
  console.log(req.params)
  console.log(req.body)
  // if (req.body.type === 'url_verification') {
  //   res.send(req.body.challenge);
  // }
  res.send(bolt.receiver.endpoints[0]);
});

app.use('/slack/enable_events', (req, res) => {
  console.log('SLACK ENABLE EVENTS')
  console.log(req.params)
  console.log(req.body)
  // if (req.body.type === 'url_verification') {
  //   res.send(req.body.challenge);
  // }
  res.send(bolt.receiver.endpoints[0]);
});

(async () => {
  await bolt.start(3000);
  console.log('⚡️ Bolt app is running!');
})();
