const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: 'xoxb-3801044593-4789184504293-R6Np4707K4JuWvwRUn5dLQvj',
  signingSecret: '752f20fef8ea68db033a899448f367f4'
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
