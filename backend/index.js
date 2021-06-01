const express = require("express");
const app = require("express")();

var server = require("http").createServer(app);

const cors = require("cors");
const bodyParser = require("body-parser");
// const router = express.Router();
const sendSms = require("./routes/userSmsRequest/sendBytwilio");
var mongoose = require("mongoose");
var path = require("path");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/sendSms", sendSms);

// mongoose.connect("mongodb://localhost:27017/Task1", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

app.use(express.static(path.join(__dirname, "build")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Running on PORT ${process.env.PORT || 5000}`)
);
