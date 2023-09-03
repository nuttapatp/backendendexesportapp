const express = require("express");
const router = express.Router();
const {
  fetchProductsOnly,
  fetchProductsByBrand,
  fetchProductsByType,
} = require("../models/utils/fetchProducts");

router.get("/:typeName?", async (req, res) => {
  try {
    let products = [];

    if (req.params.typeName) {
      const typeName = req.params.typeName.toUpperCase();
      console.log(`Fetching products of type: ${typeName}`); // Debugging

      products = await fetchProductsByType(typeName);
    } else {
      console.log("Fetching all products"); // Debugging

      products = await fetchProductsOnly();
    }

    res.json({ products });
  } catch (error) {
    console.error("Error:", error); // Debugging

    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
