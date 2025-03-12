import { z } from 'zod';

// User related types
export interface User {
    id: string;
    email: string;
    name: string;
    phoneNumber?: string;
    photoURL?: string;
}

export interface SignInInput {
    email: string;
    password: string;
}

export interface UpdateUserInput extends Omit<User, 'id' | 'email'> {}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    statusCode: number;
}

export interface UserResponseData extends User {
}

export interface SignInResponse extends ApiResponse<UserResponseData> {
}

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  
export type RegisterDto = z.infer<typeof registerSchema>;
