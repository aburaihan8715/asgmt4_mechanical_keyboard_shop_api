import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    address: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        _id: false,
      },
    ],
    totalAmount: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },

    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'canceled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model('Order', OrderSchema);
