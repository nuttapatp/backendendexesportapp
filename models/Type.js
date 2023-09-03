const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  prod_type: String,

  update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Type", TypeSchema);
