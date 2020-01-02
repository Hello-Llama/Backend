const express = require('express');
require('dotenv').config();

const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const port = process.env.PORT || 3000;
const slackEvents = createEventAdapter(slackSigningSecret);

const server = express();

server.use('/slack/events', slackEvents.requestListener());

server.use(express.json());

slackEvents.on('message.channels', event => {
  console.log("event")
  console.log(
    `Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`
  );
});

slackEvents.on('error', error => {
  console.log(error.name); // TypeError
});

(async () => {
  const server = await slackEvents.start(port);
  console.log(`Listening for events on ${server.address().port}`);
})();

server.get('/', (req, res) => {
  res.json('Received a GET request');
});

server.post('/', (req, res) => {
  res.json(req.body);
  console.log(req.body);
});
