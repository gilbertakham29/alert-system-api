const express = require("express");
const RequestModel = require("../models/requestModel");
const sendMailerAlert = require("../actions/mailer");
const THRESHOLD = 5; // number of attempts allowed
const TIME_WINDOW = 10 * 60 * 1000; // timestamp to track the number of invalid requests

const router = express.Router();

router.post("/submit", async (req, res) => {
  const { headers, body } = req;
  const clientIP =
    req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress; // to identify the type of headers from the client

  if (!headers["access-token"] || headers["access-token"] !== "valid-token") {
    const reason = "Invalid Access Token"; // for invalid token

    /*
      the code below will create the request in the mongodb database if the access-token is valid.
      */
    await RequestModel.create({ ip: clientIP, reason });

    const currentTime = Date.now();
    const failedRequests = await RequestModel.find({
      ip: clientIP,
      timeStamp: { $gte: new Date(currentTime - TIME_WINDOW) },
    });

    /*
      if the attempted failed request exceeds the THRESHOLD
      then it will send the alert email.
      */
    if (failedRequests.length >= THRESHOLD) {
      sendMailerAlert(clientIP, failedRequests.length); //function to send the alert mail.
    }
    return res.status(401).json({ message: reason });
  }
  res.status(200).json({ message: "Request successful" });
});
router.get("/metrics", async (req, res) => {
  const logs = await RequestModel.find({}); // this is to fetch all the log metrics.
  res.status(200).json(logs);
});
module.exports = router;
