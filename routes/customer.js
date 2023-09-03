const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST create a new customer
router.post("/", async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});


// router.post("/.login",(req,res) => {
//     const {email,password} =req.body;
//     EmployeeModel.findOne({emai})
// })



// PUT update an existing customer
router.put("/:customerId", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.customerId,
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

// DELETE delete a customer
router.delete("/:customerId", async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(
      req.params.customerId
    );
    if (!deletedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
