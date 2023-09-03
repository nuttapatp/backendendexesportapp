// const express = require("express");
// const router = express.Router();
// const Customer = require("../models/Customer");

// // GET user data by email
// router.get("/:email", async (req, res) => {
//   try {
//     const email = req.params.email;

//     // Find the user by email
//     const user = await Customer.findOne({ Customer_email: email });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;
