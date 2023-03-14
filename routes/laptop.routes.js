const express = require("express");
const allLaptops = require("../controllers/product.controllers");
const router = express.Router();



router.route("/bulk-update").patch(allLaptops.bulkUpdates);
router.route("/bulk-delete").delete(allLaptops.bulkDelete);


router.route("/")
.get(allLaptops.getAProduct)
.post(allLaptops.postAProduct)


  //If dynamic route always is the last
router.route("/:id")
.get(allLaptops.getASingleProduct)
.delete(allLaptops.deleteAsingleProduct)
.patch(allLaptops.updateData)



module.exports = router;