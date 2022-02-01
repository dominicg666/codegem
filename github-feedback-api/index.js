const {App} = require('@slack/bolt')
const express = require("express");
const app = express();
const cors = require("cors");
console.log(process.env)
const port = process.env.API_PORT || 3000;
const host = process.env.API_HOST || "localhost";
const FeedbackService = require("./services/feedback");
const APPROVED_ORIGINS = new Set([
    "https://github.com",
"http://localhost:8080",
"https://api.slack.com",
"https://app.slack.com",
"http://192.168.173.78:3000",
"http://192.168.173.78"
]);

app.use(express.json());
// app.use(cors({
//     origin: 
//     (origin, callback) => {
//         let allowed = APPROVED_ORIGINS.has(origin);

//         callback(allowed ? null : new Error("not an allowed origin"), allowed);
//     }
//     ,
//     optionsSuccessStatus: 200
// }));

app.use(cors({credentials: true, origin: true}));

app.post("/feedback", (req, res) => {
    let service = new FeedbackService();
    return service.saveFeedback(req.body).then(result => res.send(result));
});

app.post("/codegem", (req, res) => {
   
    let data ={
        "response_type":"in_channel",
       // text:JSON.stringify({txt:"yyy"}),
       "blocks": [
        {
            "type": "image",
            "title": {
                "type": "plain_text",
                "text": "",
                "emoji": true
            },
            "image_url": "https://uploads-ssl.webflow.com/611c73a7fe616fe220cdf89d/61232ce22c6c8c9078f9b2a2_https%253A%252F%252Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%252Fpublic%252Fimages%252F9db01257-97f3-469c-b462-7ca1082cf5dd_1142x332.png",
            "alt_text": "marg"
        },
        {
            "type": "actions",
            "block_id": "actionblock789",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Give Feedback"
                    },
                    "style": "primary",
                    "value": "click_me_456"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "My Codegem"
                    },
                    "style": "primary",
                    "value": "click_me_456"
                }
            ]
        }
    ]
    }
    return res.json(data)
});

app.listen(port, host, () => {
    console.log(`listening to ${host} on port ${port}`);
});