import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export class RegisterModel {
  email: string;
  password: string;
  constructor({ email, password }: RegisterDto) {
    this.email = email;
    this.password = password;

    this.validate();
  }

  private validate() {
    return registerSchema.parse(this);
  }
}
