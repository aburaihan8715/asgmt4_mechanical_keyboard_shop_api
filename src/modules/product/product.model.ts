import mongoose from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model<TProduct>('Product', productSchema);
