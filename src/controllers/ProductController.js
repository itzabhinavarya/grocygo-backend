const Product = require("../models/ProductModel");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, discount, couponCode, vendor } = req.body;
    const product = new Product({
      name,
      price,
      quantity,
      discount,
      couponCode,
      vendor,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products for a vendor
exports.getProductsByVendor = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.params.vendorId });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("vendor"); // Populate vendor details if needed
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products (with optional vendor filter)
exports.getAllProducts = async (req, res) => {
    try {
      const { vendorId } = req.query;
      let query = {};
  
      // Filter by vendor if vendorId is provided
      if (vendorId) {
        query.vendor = vendorId;
      }
  
      const products = await Product.find(query).populate("vendor"); // Populate vendor details if needed
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
