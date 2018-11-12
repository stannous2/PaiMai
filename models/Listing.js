var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ListingSchema object
// This is similar to a Sequelize model
var ListingSchema = new Schema({
  // `title` is of type String
  productName: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: String,
    required: true 
  },
  description: {
    type: String,
    max: [500, "Please enter a shorter description, thanks!"],
    required: true
  },
  interest: {
    type: Number,
    default: 0
  }
}, { autoIndex: true });

// This creates our model from the above schema, using mongoose's model method
var Listing = mongoose.model("Listing", ListingSchema);

// Export the Listing model
module.exports = Listing;
