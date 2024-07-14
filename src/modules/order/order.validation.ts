import { z } from 'zod';

const createOrderProductValidationSchema = z.object({
  productId: z.string({ required_error: 'Product Id is required.' }),
  quantity: z.number().int().positive().default(1),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User Id is required.' }),
    products: z.array(createOrderProductValidationSchema),
    costAmount: z.number(),
    amount: z.number({ required_error: 'Amount is required.' }),
    address: z.string({ required_error: 'Address is required.' }),
    status: z
      .enum(['pending', 'shipped', 'delivered', 'canceled'])
      .default('pending'),
  }),
});

const updateOrderProductValidationSchema = z.object({
  productId: z.string().optional(),
  quantity: z.number().int().positive().default(1).optional(),
});

const updateOrderValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    products: z.array(updateOrderProductValidationSchema).optional(),
    costAmount: z.number().optional(),
    address: z.string().optional(),
    status: z
      .enum(['pending', 'shipped', 'delivered', 'canceled'])
      .default('pending')
      .optional(),
  }),
});

export const OrderValidationSchemas = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
