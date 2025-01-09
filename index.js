const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const requestRouter = require("./routes/requestRoute");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed.", err));
app.use("/api", requestRouter);
app.listen(port, () => console.log(`Server is running on port: ${port}`));
