var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var YardSaleSchema = new Schema({
  // `title` is of type String
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
  listings: [{
    type: Schema.Types.ObjectId,
    ref: "Listing"
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

// This creates our model from the above schema, using mongoose's model method
var YardSale = mongoose.model("YardSale", YardSaleSchema);

// Export the Note model
module.exports = YardSale;