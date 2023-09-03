const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product.js");
const Brand = require("../models/Brand.js");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    const brands = await Brand.find();

    const combinedData = {
      brands: brands,
      products: products,
    };

    res.json(combinedData);
  } catch (err) {
    next(err);
  }
});

router.get("/brands/:brandName", async (req, res, next) => {
  try {
    const brandName = req.params.brandName;

    // Query the database to find products with the specified brand name
    const brandProducts = await Product.find({ brand_name: brandName });

    res.json(brandProducts);
  } catch (err) {
    next(err);
  }
});

// app.get("/products", (req, res) => {
//   const { prod_name } = req.query;

//   if (!prod_name) {
//     return res.status(400).json({ error: "Missing search query" });
//   }

//   // Filter products based on the prod_name query
//   const filteredProducts = products.filter((product) =>
//     product.prod_name.toLowerCase().includes(prod_name.toLowerCase())
//   );

//   res.json({ products: filteredProducts });
// });












router.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
     const brand = await Brand.create(req.body);
    const products = await Product.find();
    const brands = await Brand.find();

    const combinedData = {
      brands: brands,
      products: products,
    };

    res.json(combinedData);
  } catch (err) {
    next(err);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.json(product);
//   } catch (err) {
//     next(err);
//   }
// });

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(id);
    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedProduct && !deletedBrand) {
      return res.status(404).json({ message: "Entity not found" });
    }

    const products = await Product.find();
    const brands = await Brand.find();

    const combinedData = {
      brands: brands,
      products: products,
    };

    res.json(combinedData);
  } catch (err) {
    next(err);
  }
});




router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const products = await Product.find();
    const brands = await Brand.find();

    const combinedData = {
      brands: brands,
      products: products,
    };

    res.json(combinedData);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const products = await Product.find();
    const brands = await Brand.find();

    const combinedData = {
      brands: brands,
      products: products,
    };

    res.json(combinedData);
  } catch (err) {
    next(err);
  }
});





router.delete("/", async (req, res, next) => {
  try {
    await Product.deleteMany({});
    await Brand.deleteMany({});

    res.json({ message: "All data has been deleted." });
  } catch (err) {
    next(err);
  }
});



module.exports = router;
