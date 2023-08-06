const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
// const dotenv = require("/.env");
const app = express();
const upload = multer();
const url = process.env.MONGO_DB_URL;

// Create a storage object with a given configuration
// const storage = new GridFsStorage({
//   url,
//   file: (req, file) => {
//     //If it is an image, save to photos bucket
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//       return {
//         bucketName: "photos",
//         filename: `${Date.now()}_${file.originalname}`,
//       };
//     } else {
//       //Otherwise save to default bucket
//       return `${Date.now()}_${file.originalname}`;
//     }
//   },
// });

// // Set multer storage engine to the newly created object
// const upload1 = multer({ storage });
const cors = require("cors");

const domainsFromEnv =
  "http://localhost:3000, https://www.student-ecosystem.com";
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
const RewardRoute = require("./Routes/Reward.route");
const OperationRoute = require("./Routes/Operation.route");
const ActivityRoute = require("./Routes/Activity.route");
const UserRoute = require("./Routes/User.route");
const PostRoute = require("./Routes/Post.route");
const PostItemsRoute = require("./Routes/PostItems.route");
const CommentRoute = require("./Routes/Comment.route");
const LikeRoute = require("./Routes/Like.route");
const EventRoute = require("./Routes/Event.route");
app.use("/products", upload.none(), ProductRoute);
app.use("/tasks", upload.none(), TaskRoute);
app.use("/rewards", upload.none(), RewardRoute);
app.use("/operation", upload.none(), OperationRoute);
app.use("/activities", upload.none(), ActivityRoute);
app.use("/api/auth", upload.none(), UserRoute);
app.use("/posts", upload.none(), PostRoute);
app.use("/posts_items", upload.none(), PostItemsRoute);
app.use("/comments", upload.none(), CommentRoute);
app.use("/likes", upload.none(), LikeRoute);
app.use("/events", upload.none(), EventRoute);

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

app.listen(3000, "0.0.0.0", () => {
  console.log("connected at port " + 3000);
});
