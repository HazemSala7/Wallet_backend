const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  // bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
  //   if (err) {
  //     res.json({
  //       error: err,
  //     });
  //   }
  // });
  const salt = bcrypt.genSaltSync(10);
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    birthday: req.body.birthday,
    vouchars: req.body.vouchars,
    points: req.body.points,
    credits: req.body.credits,
    password: bcrypt.hashSync(req.body.password, salt),
  });
  user
    .save()
    .then((user) => {
      res.json({
        message: "User Added Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        error: error.message,
      });
    });
};

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err.message,
            });
          }
          if (result) {
            let token = jwt.sign({ name: user.name }, "verySecretValue", {
              expiresIn: "1h",
            });
            res.json({
              message: "Login Successful!",
              access_token: token,
              user: user,
            });
          } else {
            res.json({
              message: "Password does not matched!",
            });
          }
        });
      } else {
        res.json({
          message: "No user found!",
        });
      }
    }
  );
};

const getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.json({
        users: users,
      });
    })
    .catch((error) => {
      res.json({
        error: error.message,
      });
    });
};

const addFriendById = (req, res, next) => {
  const userId = req.params.userId; // Assuming the user ID is provided as a route parameter
  const friendId = req.body.friendId; // Assuming the friend ID is provided in the request body

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.json({
          message: "User not found",
        });
      }

      User.findById(friendId)
        .then((friend) => {
          if (!friend) {
            return res.json({
              message: "Friend not found",
            });
          }

          // Check if the friend is already in the user's friends array
          const isAlreadyFriend = user.friends.includes(friendId);
          if (isAlreadyFriend) {
            return res.json({
              message: "Friend is already added",
            });
          }

          user.friends.push(friendId);
          user
            .save()
            .then(() => {
              res.json({
                message: "Friend added successfully",
              });
            })
            .catch((error) => {
              res.json({
                error: error.message,
              });
            });
        })
        .catch((error) => {
          res.json({
            error: error.message,
          });
        });
    })
    .catch((error) => {
      res.json({
        error: error.message,
      });
    });
};

const deleteUserById = (req, res, next) => {
  const userId = req.params.userId; // Assuming the user ID is provided as a route parameter

  User.findByIdAndDelete(userId)
    .then(() => {
      res.json({
        message: "User deleted successfully",
      });
    })
    .catch((error) => {
      res.json({
        error: error.message,
      });
    });
};

const getUsersData = (req, res, next) => {
  const userIds = req.body.userIds; // Assuming the array of user IDs is provided in the request body as "userIds"

  User.find({ _id: { $in: userIds } })
    .then((users) => {
      res.json({
        users: users,
      });
    })
    .catch((error) => {
      res.json({
        error: error.message,
      });
    });
};

module.exports = {
  register,
  login,
  getAllUsers,
  addFriendById,
  deleteUserById,
  getUsersData,
};
