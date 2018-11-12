const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("../passport");
router.get("/user", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    return res.json({
      user: req.user
    });
  } else {
    return res.json({
      user: null
    });
  }
});

router.post(
  "/login",
  function (req, res, next) {
    console.log(req.body);
    console.log("================");
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("POST to /login");
    const user = JSON.parse(JSON.stringify(req.user)); // hack
    const cleanUser = Object.assign({}, user);
    if (cleanUser.local) {
      console.log(`Deleting ${cleanUser.local.password}`);
      delete cleanUser.local.password;
    }
    res.json({
      user: cleanUser
    });
  }
);

router.post("/logout", (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie("connect.sid"); // clean up!
    return res.json({
      msg: "logging you out"
    });
  } else {
    return res.json({
      msg: "no user to log out!"
    });
  }
});

router.post("/signup", (req, res) => {
  const {
    password, 
    First,
    Last,
    email
  } = req.body;
    // ADD VALIDATION
  User.findOne({
    "local.email": email
  }, (err, userMatch) => {
    if (userMatch) {
      return res.json({
        error: `Sorry, already a user with the email: ${email}`
      });
    } else{ 
      const newUser = new User({
        "local.email": email,
        "local.password": password,
        "First": First,
        "Last": Last
      });
      newUser.save((err, savedUser) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }
        console.log(savedUser);
        return res.json(savedUser);
      });
    }
  
  });
});

module.exports = router;