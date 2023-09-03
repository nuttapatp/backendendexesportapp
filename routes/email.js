// routes/emails.js
const express = require("express");
const Email = require("../models/Email");

const router = express.Router();

// POST method to save email
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(201).send({ message: "Email saved successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET method to retrieve all emails
router.get("/", async (req, res) => {
  try {
    const emails = await Email.find();
    res.status(200).send(emails);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
