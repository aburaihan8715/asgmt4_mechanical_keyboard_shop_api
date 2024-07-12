import { z } from 'zod';

const createProductSchemaValidation = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    image: z.string().url('Image must be a valid URL'),
    brand: z.string().min(1, 'Brand is required'),
    availableQuantity: z
      .number()
      .min(0, 'Available quantity cannot be negative'),
    price: z.number().min(0, 'Price cannot be negative'),
    rating: z
      .number()
      .min(0, 'Rating cannot be negative')
      .max(5, 'Rating cannot exceed 5'),
  }),
});
const updateProductSchemaValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
    brand: z.string().optional(),
    availableQuantity: z.number().optional(),
    price: z.number().optional(),
    rating: z.number().optional(),
  }),
});

export const ProductValidationSchemas = {
  createProductSchemaValidation,
  updateProductSchemaValidation,
};
