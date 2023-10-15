const Product = require("../Product");

async function fetchProductsOnly() {
  try {
    return await Product.find(); 
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function fetchProductsByBrand(brandName) {
  try {
    return await Product.find({ brand_name: brandName });
  } catch (error) {
    console.error(`Error fetching products for brand ${brandName}:`, error);
    throw error;
  }
}

async function fetchProductsByType(typeName) {
  try {
    console.log("Attempting to fetch products of type:", typeName);
    const products = await Product.find({ prod_type: typeName });
    console.log("Fetched products:", products);
    return products;
  } catch (error) {
    console.error(`Error fetching products for type ${typeName}:`, error);
    throw error;
  }
}


module.exports = {
  fetchProductsOnly,
  fetchProductsByBrand,
  fetchProductsByType,
};
