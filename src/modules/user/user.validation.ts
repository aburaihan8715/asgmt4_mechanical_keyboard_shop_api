import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['user', 'admin']),
    image: z.string().url('Image must be a valid URL').optional(),
  }),
});

export const UserValidationSchemas = {
  createUserValidationSchema,
};
