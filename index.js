const line = require('@line/bot-sdk')
const express = require('express')
const axios = require('axios').default
const dotenv = require('dotenv')

const env = dotenv.config().parsed
const app = express()

const lineConfig = {
    channelAccessToken: env.ACCESS_TOKEN,
    channelSecret: env.SECRET_TOKEN
}
//create client
const client = new line.Client(lineConfig);

app.post('/webhook' , line.middleware(lineConfig), async (req, res) =>{
    try{
        const events = req.body.events
        console.log('event=>>>>',events)
        return events.length > 0 ? await events.map(item => handleEvent(item)) : res.status(200).send("OK")

    }catch (error) {
        res.status(500).end()
    }
});

const handleEvent = async (event) => {
    if(event.type !== 'message' || event.message.type !== 'text'){
        return null;
    }
    else if (event.type === 'message'){
        return client.replyMessage(event.replyToken,{type:'text',text:'Test'})
    }
}

app.listen(4000, () => {
    console.log('listening 0n 4000');
});