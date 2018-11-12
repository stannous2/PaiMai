var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;
delete mongoose.connection.models["User"];

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  local: {
    username: {
      type: String,
      unique: false,
      required: false
    },
    password: {
      type: String,
      unique: false,
      required: false
    }
  },
  name: String,
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    required: false
  },
  yardSales: [{
    type: Schema.Types.ObjectId,
    ref: "YardSale"
  }]
});
UserSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.local.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

UserSchema.pre("save", function (next) {
  if (!this.local.password) {
    console.log("=======NO PASSWORD PROVIDED=======");
    next();
  } else {
    this.local.password = this.hashPassword(this.local.password);
    next();
  }
});
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
