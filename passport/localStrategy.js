const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy({
  usernameField: "email" // not necessary, DEFAULT
},
function (email, password, done) {
  console.log(password);
  User.findOne({
    "local.email": email
  }, (err, userMatch) => {
    if (err) {
      return done(err);
    }
    if (!userMatch) {
      return done(null, false, {
        message: "Incorrect email/password"
      });
    }
    if (!userMatch.checkPassword(password)) {
      return done(null, false, {
        message: "Incorrect email/password"
      });
    }
    return done(null, userMatch);
  });
}
);

module.exports = strategy;