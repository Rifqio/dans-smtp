const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// Routes
const UserRoute = require("./routes/UserRoute");
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);
app.use("/", UserRoute);
app.listen(5000, () => console.log("Listening on port 5000"));
