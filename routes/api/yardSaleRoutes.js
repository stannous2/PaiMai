const router = require("express").Router();
const yardSaleController = require("../../controllers/yardSaleController");

// Matches with "/api/yardSale"
router.route("/")
  .get(yardSaleController.findAll)
  .post(yardSaleController.create)
// Matches with "/api/yardSale/:id"
router
  .route("/:id")
  .get(yardSaleController.findById)
  .post(yardSaleController.createNewListing)
  .put(yardSaleController.update)
  .delete(yardSaleController.remove);
//Matches with "/api/yardSales/zipCode/:zipCode"
router
  .route("/zipCode/:zipCode")
  .get(yardSaleController.findByZipCode)
module.exports = router;
