const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  brand_name: String,
  logo_image: String,

  update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Brand", BrandSchema);
