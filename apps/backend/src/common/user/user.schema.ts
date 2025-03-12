import { z } from 'zod';

export const userSchema = z.object({
  email: z.string(),
  name: z.string(),
  photoURL: z.string().optional(),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8),
  photoURL: z.string().optional(),
});
