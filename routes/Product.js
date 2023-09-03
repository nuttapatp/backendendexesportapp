const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  prod_name: String,
  prod_desc: String,
  prod_price: Number,
  brand_name: String,
  product_image: String,
  product_image2: String,
  product_image3: String,
  product_image4: String,
  prod_sex: String,
  prod_type: String,
  on_sale: { type: Boolean, default: false }, // default to false if not provided
  sale_price: { type: Number, default: 0 }, // default to 0 if not provided
  new_arrival: { type: Boolean, default: false }, 
  update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
