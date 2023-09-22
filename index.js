const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios').default;
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
const app = express();

const lineConfig = {
    channelAccessToken: env.ACCESS_TOKEN,
    channelSecret: env.SECRET_TOKEN
};

// Create a client
const client = new line.Client(lineConfig);

app.use(express.json());

app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
    try {
        const events = req.body.events;
        console.log('events =>>>', events);

        // Respond to LINE's server immediately to acknowledge receipt
        res.status(200).end();

        if (events && events.length > 0) {
            // Use Promise.all to handle events concurrently
            await Promise.all(events.map(item => handleEvent(item)));
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).end();
    }
});

const handleEvent = async (event) => {
    console.log(event);
    await client.replyMessage(event.replyToken, { type: 'text', text: 'Test' });
};

app.listen(4000, () => {
    console.log('Listening on 4000');
});
