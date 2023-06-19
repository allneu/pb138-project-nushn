import { z } from 'zod';

const passwordSchema = z.string()
  .refine((value) => value.length >= 8, { message: 'Password must be at least 8 characters long' })
  .refine((value) => /[A-Z]/.test(value), { message: 'Password must contain at least one uppercase letter' })
  .refine((value) => /[a-z]/.test(value), { message: 'Password must contain at least one lowercase letter' })
  .refine((value) => /\d/.test(value), { message: 'Password must contain at least one digit' })
  .refine((value) => /\W/.test(value), { message: 'Password must contain at least one special character' });

export const changePasswordFormSchema = z.object({
  oldPassword: z.string().nonempty('Enter your old password'),
  newPassword: passwordSchema,
});

export type ChangePasswordFormDataType = z.infer<typeof changePasswordFormSchema>;
