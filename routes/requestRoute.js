const express = require("express");
const RequestModel = require("../models/requestModel");
const sendMailerAlert = require("../actions/mailer");
const THRESHOLD = 5;
const TIME_WINDOW = 10 * 60 * 1000;

const router = express.Router();

router.post("/submit", async (req, res) => {
  const { headers, body } = req;
  const clientIP =
    req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (!headers["access-token"] || headers["access-token"] !== "valid-token") {
    const reason = "Invalid Access Token";

    await RequestModel.create({ ip: clientIP, reason });

    const currentTime = Date.now();
    const failedRequests = await RequestModel.find({
      ip: clientIP,
      timeStamp: { $gte: new Date(currentTime - TIME_WINDOW) },
    });
    if (failedRequests.length >= THRESHOLD) {
      sendMailerAlert(clientIP, failedRequests.length);
    }
    return res.status(401).json({ message: reason });
  }
  res.status(200).json({ message: "Request successful" });
});
router.get("/metrics", async (req, res) => {
  const logs = await RequestModel.find({});
  res.status(200).json(logs);
});
module.exports = router;
