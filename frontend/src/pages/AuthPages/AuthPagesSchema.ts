import { z } from 'zod';

export const logInSchema = z.object({
  email: z.string().email({ message: 'Valid e-mail address required' }).nonempty({ message: 'Email is required' }),
  password: z.string().nonempty({ message: 'Password is required' }),
});

export type LogInFormDataType = z.infer<typeof logInSchema>;

const passwordSchema = z.string()
  .refine((value) => value.length >= 8, { message: 'Password must be at least 8 characters long' })
  .refine((value) => /[A-Z]/.test(value), { message: 'Password must contain at least one uppercase letter' })
  .refine((value) => /[a-z]/.test(value), { message: 'Password must contain at least one lowercase letter' })
  .refine((value) => /\d/.test(value), { message: 'Password must contain at least one digit' })
  .refine((value) => /\W/.test(value), { message: 'Password must contain at least one special character' });

export const signUpSchema = z.object({
  username: z.string().nonempty({ message: 'Username is required' }),
  email: z.string().nonempty({ message: 'Email required' }).email({ message: 'Invalid email address' }),
  password: passwordSchema,
});

export type SignUpFormDataType = z.infer<typeof signUpSchema>;
