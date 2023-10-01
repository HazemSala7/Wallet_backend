if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
app.use("/Images", express.static("Images"));
const upload = multer();

const cors = require("cors");
const url = process.env.MONGO_DB_URL;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload1 = multer({ storage: storage });

const domainsFromEnv =
  "http://localhost:3000, https://www.student-ecosystem.com , https://together-backend-0070.onrender.com , https://together-wallet.onrender.com ,https://together-ecosystem.com";
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
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

const ProductRoute = require("./Routes/Product.route");
const TaskRoute = require("./Routes/Task.route");
const RewardRoute = require("./Routes/Reward.route");
const OperationRoute = require("./Routes/Operation.route");
const ActivityRoute = require("./Routes/Activity.route");
const UserRoute = require("./Routes/User.route");
const PostRoute = require("./Routes/Post.route");
const PostItemsRoute = require("./Routes/PostItems.route");
const CommentRoute = require("./Routes/Comment.route");
const LikeRoute = require("./Routes/Like.route");
const EventRoute = require("./Routes/Event.route");
const PostController = require("./Controllers/Post.Controller");
app.use("/products", upload.none(), ProductRoute);
app.use("/tasks", upload1.single("image"), TaskRoute);
app.use("/rewards", upload.none(), RewardRoute);
app.use("/operation", upload.none(), OperationRoute);
app.use("/activities", upload.none(), ActivityRoute);
app.use("/api/auth", upload.none(), UserRoute);
app.use("/posts", upload1.single("photo"), PostRoute);
app.use("/posts_items", upload1.single("photo"), PostItemsRoute);
app.use("/comments", upload.none(), CommentRoute);
app.use("/likes", upload.none(), LikeRoute);
app.use("/events", upload1.single("image"), EventRoute);

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

app.listen(4000, "0.0.0.0", () => {
  console.log("connected at port " + 3000);
});
