require('dotenv').config();
const { App } = require('@slack/bolt');

const hello_llama_id = 'CS7KD7WRW';

const users = [];

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  ignoreSelf: false,
});

app.event('member_joined_channel', async ({ event, context }) => {
    try {
        console.log(`Event: ${event.user}`)
        users.push(event.user)
        console.log(users)
        const result = await app.client.chat.postMessage({
            token: context.botToken,
            channel: hello_llama_id,
            text: "Welcome!"
        })
    } catch(error) {
        console.log(error)
    }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
