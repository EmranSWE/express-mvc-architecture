const express = require("express");
const allLaptops = require("../controllers/product.controllers");
const router = express.Router();

router.route("/")
.get(allLaptops.getAProduct)
.post(allLaptops.postAProduct)

router.route("/:id")
.get(allLaptops.getASingleProduct)
.delete(allLaptops.deleteAsingleProduct)

module.exports = router;