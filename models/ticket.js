const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  cartId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true
  }, 
  userId: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String, 
    required: true
  },
  response: {
    type: String,
    required: false,
    default: null,
  },
  imageUrls: []
}, {
    timestamps: true,
});


const ticketModel = mongoose.model("tickets", ticketSchema);

module.exports = ticketModel;