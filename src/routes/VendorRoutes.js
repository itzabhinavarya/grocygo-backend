const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/VendorController");

router.post("/vendors", vendorController.createVendor);
router.get("/vendors", vendorController.getVendors);
router.get("/vendors/:id", vendorController.getVendorById);
router.put("/vendors/:id", vendorController.updateVendor);
router.delete("/vendors/:id", vendorController.deleteVendor);

module.exports = router;