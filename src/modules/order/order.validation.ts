import { z } from 'zod';

const createOrderProductValidationSchema = z.object({
  productId: z.string({ required_error: 'Product Id is required.' }),
  quantity: z.number().int().positive().default(1),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    address: z.string({ required_error: 'Address is required.' }),
    email: z.string().email('Invalid email address'),
    name: z.string({ required_error: 'Name is required.' }),
    mobile: z.string({ required_error: 'Mobile number is required.' }),
    products: z.array(createOrderProductValidationSchema),
    totalAmount: z
      .number()
      .nonnegative('Total amount must be a positive number'),
    totalQuantity: z
      .number()
      .int()
      .min(1, 'Total quantity must be at least 1'),
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
    address: z.string().optional(),
    email: z.string().optional(),
    name: z.string().optional(),
    mobile: z.string().optional(),
    products: z.array(updateOrderProductValidationSchema).optional(),
    totalAmount: z
      .number()
      .nonnegative('Total amount must be a positive number')
      .optional(),
    totalQuantity: z
      .number()
      .int()
      .min(1, 'Total quantity must be at least 1')
      .optional(),
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
