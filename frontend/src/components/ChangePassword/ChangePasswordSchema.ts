import { z } from 'zod';

export const changePasswordFormSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(3, 'Name must be at least 3 characters'),
});

export type ChangePasswordFormDataType = z.infer<typeof changePasswordFormSchema>;
