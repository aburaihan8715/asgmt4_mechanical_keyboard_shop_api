import { z } from 'zod';

const createCartProductValidationSchema = z.object({
  productId: z.string({ required_error: 'Product Id is required.' }),
  quantity: z.number().int().positive().default(1),
});

const createCartValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User Id is required.' }),
    products: z.array(createCartProductValidationSchema),
  }),
});

const updateCartProductValidationSchema = z.object({
  productId: z.string().optional(),
  quantity: z.number().int().positive().default(1).optional(),
});

const updateCartValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    products: z.array(updateCartProductValidationSchema).optional(),
  }),
});

export const CartValidationSchemas = {
  createCartValidationSchema,
  updateCartValidationSchema,
};
