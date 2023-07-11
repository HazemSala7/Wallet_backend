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

module.exports = {
  register,
  login,
};
