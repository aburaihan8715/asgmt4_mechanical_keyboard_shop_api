import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { TCart } from './cart.interface';

const CartSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

export const Cart = mongoose.model<TCart>('Cart', CartSchema);
