const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    products: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productImage: {
          type: String,
          required: true,
        },
        productId: {
          type: String,
          required: true
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("carts", cartSchema);

module.exports = cartModel;