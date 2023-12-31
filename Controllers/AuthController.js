const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const {
    name,
    email,
    phone,
    gender,
    birthday,
    vouchers,
    points,
    credits,
    password,
    role,
    status,
  } = req.body;

  if (role && role !== "user" && role !== "admin") {
    return res.status(400).json({ message: "Invalid user role" });
  }
  if (status && status !== "pending" && status !== "active") {
    return res.status(400).json({ message: "Invalid user status" });
  }

  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = new User({
    name,
    email,
    phone,
    gender,
    birthday,
    vouchers,
    points,
    credits,
    password: hashedPassword,
    role,
    status,
  });

  user
    .save()
    .then((user) => {
      res.status(200).json({
        message: "Registration successful",
        user: user,
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
  User.findOne({
    $or: [{ email: username }, { name: username }],
  }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err.message,
          });
        }
        if (result) {
          let token = jwt.sign({ user }, "verySecretValue", {
            expiresIn: "1h",
          });
          res.status(200).json({
            message: "Login Successful!",
            access_token: token,
            user: user,
          });
        } else {
          res.status(404).json({
            message: "Password does not matched!",
          });
        }
      });
    } else {
      res.status(404).json({
        message: "No user found!",
      });
    }
  });
};

const getCurrentUser = (req, res, next) => {
  // Extract the JWT token from the request headers or query params, depending on your application setup.
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(401).json({
      message: "Access token not provided.",
    });
  }

  // Verify the JWT token
  jwt.verify(token, "verySecretValue", (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid access token.",
      });
    }

    // Here, decodedToken contains the data that was signed while generating the token
    const user = decodedToken.user; // Assuming that the "name" was stored in the token during the login process

    // You can fetch additional user data from the database if required.
    // For this example, we are returning the user name obtained from the token.
    res.json({
      message: "Current user retrieved successfully.",
      user: user,
    });
  });
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

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
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
            return res.status(200).json({
              message: "Friend not found",
            });
          }

          // Check if the friend is already in the user's friends array
          const isAlreadyFriend = user.friends.includes(friendId);
          if (isAlreadyFriend) {
            return res.status(200).json({
              message: "Friend is already added",
            });
          }

          user.friends.push(friendId);
          user
            .save()
            .then(() => {
              res.status(200).json({
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

const editUserById = (req, res, next) => {
  const userId = req.params.id;
  const {
    name,
    email,
    phone,
    gender,
    birthday,
    vouchers,
    points,
    credits,
    role,
  } = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Update user information
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.gender = gender || user.gender;
      user.birthday = birthday || user.birthday;
      user.vouchers = vouchers || user.vouchers;
      user.points = points || user.points;
      user.credits = credits || user.credits;
      user.role = role || user.role;

      user
        .save()
        .then(() => {
          res.status(200).json({
            message: "User data updated successfully",
            user: user,
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
      res.status(200).json({
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

const activateAccount = (req, res, next) => {
  const userId = req.params.id;

  User.findByIdAndUpdate(
    userId,
    { status: "active" },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res
        .status(200)
        .json({ message: "Account activated successfully", user });
    }
  );
};

module.exports = {
  register,
  login,
  getAllUsers,
  addFriendById,
  editUserById,
  deleteUserById,
  getUsersData,
  getUserById,
  getCurrentUser,
  activateAccount,
};
