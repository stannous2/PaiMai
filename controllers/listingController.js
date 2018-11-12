const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    let userid = req.headers.userid;
    console.log(userid);
    db.Listing
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Listing
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Listing
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Listing
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  increment: function(req,res){
    console.log(req);
    db.Listing
    .findOneAndUpdate({_id: req.params.id}, {$inc: {interest: 1}})
       .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Listing
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
