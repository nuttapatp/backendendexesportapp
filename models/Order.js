// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },

//   items: [
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product", // Reference to your Product model
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//       size: String, // If you have size
//       // ... any other relevant properties
//     },
//   ],
//   orderDate: {
//     type: Date,
//     default: Date.now,
//   },
//   // ... add other relevant fields such as orderStatus, totalAmount, shippingAddress etc.
// });

// module.exports = mongoose.model("Order", OrderSchema);
