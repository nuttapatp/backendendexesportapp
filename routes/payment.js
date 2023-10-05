const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51Nx8oJGZMu4IjZdEs38XSQk2oIBky11mcUUF0e158hTFjVqmNPZdQXO7detICFSyYHsLncHeCGoNLNKkmDvoeXRM00fTe1WWTw"
);


const express = require("express");
const router = express.Router();

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "thb", 
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;