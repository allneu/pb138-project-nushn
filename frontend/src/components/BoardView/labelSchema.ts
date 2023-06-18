import { z } from 'zod';

export const labelFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
});

export type LabelFormDataType = z.infer<typeof labelFormSchema>;
