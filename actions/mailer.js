const nodemailer = require("nodemailer");
require("dotenv").config();
const sendMailerAlert = (ip, attempts) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: process.env.RECIEPT_EMAIL,
    subject: `Alert: High Failed Requests from ${ip}`,
    text: `The IP address ${ip} has made ${attempts} failed attempts in the last 10 minutes.`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Alert email sent:", info.response);
    }
  });
};
module.exports = sendMailerAlert;
