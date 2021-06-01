const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);

  const accountSid = req.body.data.authSid;
  const authToken = req.body.data.authToken;

  const messagingServiceSid = req.body.data.authMsgSid;
  const client = require("twilio")(accountSid, authToken);

  client.messages.create({
    body: req.body.data.smsBody,
    messagingServiceSid: messagingServiceSid,
    to: req.body.data.finalNumber,
  });

  res.json("sent");
});

router.post("/MessageStatus", async (req, res) => {
  /// console.log(req.body);

  res.json("sent");
});

module.exports = router;
