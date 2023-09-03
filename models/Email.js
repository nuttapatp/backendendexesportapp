// models/Email.js
const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // To ensure each email is saved only once
  },
});

module.exports = mongoose.model("Email", emailSchema);
