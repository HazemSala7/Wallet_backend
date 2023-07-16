const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const upload = multer();
const cors = require("cors");

const domainsFromEnv = "http://localhost:3000";
const whitelist = domainsFromEnv.split(",").map((item) => item.trim());
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://hazemsala7:B0346AsECQ4YxuGn@cluster0.bttmeup.mongodb.net/",
    {
      dbName: "wallet",
      user: "hazemsala7",
      pass: "B0346AsECQ4YxuGn",
    }
  )
  .then(() => {
    console.log("connected DATABASE");
  });

app.get("/test", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});
app.all("/test", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

const ProductRoute = require("./Routes/Product.route");
const TaskRoute = require("./Routes/Task.route");
const OperationRoute = require("./Routes/Operation.route");
const ActivityRoute = require("./Routes/Activity.route");
const UserRoute = require("./Routes/User.route");
app.use("/products", upload.none(), ProductRoute);
app.use("/tasks", upload.none(), TaskRoute);
app.use("/operation", upload.none(), OperationRoute);
app.use("/activities", upload.none(), ActivityRoute);
app.use("/api/auth", upload.none(), UserRoute);

// app.get("/products", (req, res, next) => {
//     res.
// });

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(4000, () => {
  console.log("connected at port " + 4000);
});
