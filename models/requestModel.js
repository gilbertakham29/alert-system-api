const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  ip: String,
  timeStamp: { type: Date, default: Date.now },
  reason: String,
});
const RequestModel = mongoose.model("RequestModel", requestSchema);
module.exports = RequestModel;
