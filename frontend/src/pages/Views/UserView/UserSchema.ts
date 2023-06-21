import { z } from 'zod';

export const userFormSchema = z.object({
  avatar: z.string(),
  username: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().nonempty('User must have an email').email('Invalid email address'),
});

export type UserFormDataType = z.infer<typeof userFormSchema>;
