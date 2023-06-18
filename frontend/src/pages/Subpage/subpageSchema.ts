import { z } from 'zod';

export const subpageFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string(),
});

export type SubpageFormDataType = z.infer<typeof subpageFormSchema>;
