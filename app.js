const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
const ActivityRoute = require("./Routes/Activity.route");
const UserRoute = require("./Routes/User.route");
app.use("/products", ProductRoute);
app.use("/tasks", TaskRoute);
app.use("/activities", ActivityRoute);
app.use("/api/auth", UserRoute);

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

app.listen(3000, () => {
  console.log("connected");
});
