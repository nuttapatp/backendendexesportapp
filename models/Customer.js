const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  name: String,
  email: String,
 password:String,

  update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Customer", BrandSchema);
