const router = require("express").Router();
const listingController = require("../../controllers/listingController");

// Matches with "/api/listing"
router.route("/")
  .get(listingController.findAll)
  .post(listingController.create);

// Matches with "/api/listing/:id"
router
  .route("/:id")
  .get(listingController.findById)
  .put(listingController.update)
  .delete(listingController.remove);

router
  .route("/inc/:id")
  .put(listingController.increment);
module.exports = router;
