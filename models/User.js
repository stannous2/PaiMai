var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;
delete mongoose.connection.models.User;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  local: 
  {
    email: {
      type: String,
      unique: true,
      required: false
    },
    password: {
    type: String,
    unique: false,
    required: false
  } 
  },

  First: {
    type: String,
    unique: false,
    required: false
  },

  Last: {
    type: String,
    unique: false,
    required: false
  },
  
  password: {
    type: String,
    unique: false,
    required: false
  },
  firstname: {
    type: String,
    unique: false,
    required: false
  },
  lastname: {
    type: String,
    unique: false,
    required: false
  },
  // name: String,

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
  debugger;
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
