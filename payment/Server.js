const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecretKey);

if (stripeSecretKey) {
  console.log(
    `STRIPE_SECRET_KEY is set with length: ${stripeSecretKey.length}`
  );
} else {
  console.error("STRIPE_SECRET_KEY is not set!");
}

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set CORS headers first before any routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/test", (req, res) => {
  console.log("Test endpoint hit");
  res.send("Test endpoint successful");
});

const YOUR_DOMAIN = process.env.DOMAIN || "http://localhost:4242";

app.get("/", (req, res) => {
  res.send("Checkout session endpoint is working!");
});

app.post("/create-checkout-session", async (req, res) => {
  console.log("POST request received for /create-checkout-session");

  const products = req.body;
  console.log("Received products:", products);
  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "thb",
        product_data: {
          name: product.prod_name,
          images: [product.product_image],
          description: `Size: ${product.size}`, // Add size to the description
        },
        unit_amount:
          (product.on_sale ? product.sale_price : product.prod_price) * 100, // Check for sale and convert to satang
      },
      quantity: product.quantity,
    }));
    console.log("Line items being sent to Stripe:", lineItems);
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "TH"],
      },
    });
    res.json({ url: session.url }); // Send back the session URL
    return; // Exit to avoid any further responses
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).send("Error creating Stripe checkout session");
  }
});


module.exports = app;

