const express = require("express");
const router = express.Router();
const Cart = require("../models/SaveCart");

router.post("/save-cart", async (req, res) => {
  try {
    // Extract user ID and items from the request body
    const { userId, items } = req.body;

    // Check if a cart exists for the user
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Update the cart if it exists
      cart.items = items;
      cart.updatedAt = Date.now();
    } else {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items });
    }

    await cart.save();

    res.status(200).json({ message: "Cart saved successfully" });
  } catch (error) {
    console.error("Failed to save cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// New GET endpoint to retrieve the cart for a given user ID
router.get("/get-cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Failed to retrieve cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-cart", async (req, res) => {
  try {
    const carts = await Cart.find();

    if (carts.length === 0) {
      return res.status(404).json({ message: "No carts found" });
    }

    res.status(200).json(carts);
  } catch (error) {
    console.error("Failed to retrieve carts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
