import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['user', 'admin']).default('user').optional(),
    image: z.string().url('Image must be a valid URL').optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
  }),
});

export const AuthValidationSchemas = {
  registerValidationSchema,
  loginValidationSchema,
};
