const express = require("express");
const router = express.Router();
const Brand = require("../models/Brand"); // Import your Brand model or schema

// GET /brands
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json({ brands });
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /brands
router.post("/", async (req, res) => {
  const brandData = req.body;

  try {
    const newBrand = await Brand.create(brandData);
    res.status(201).json(newBrand);
  } catch (error) {
    console.error("Error creating brand:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /brands/:id
router.put("/:id", async (req, res) => {
  const brandId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedBrand = await Brand.findByIdAndUpdate(brandId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json(updatedBrand);
  } catch (error) {
    console.error("Error updating brand:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /brands/:id
router.delete("/:id", async (req, res) => {
  const brandId = req.params.id;

  try {
    const deletedBrand = await Brand.findByIdAndDelete(brandId);

    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.error("Error deleting brand:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
