const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Define a route to get a single product by its _id
router.get("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Define a route to update a single product by its _id
router.put("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updateData = req.body; // Assuming you send the updated data in the request body

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run model validations on update
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
