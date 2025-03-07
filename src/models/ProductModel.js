const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Percentage discount
  couponCode: { type: String, default: "" }, // Coupon code for discount
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true }, // Reference to the vendor
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);