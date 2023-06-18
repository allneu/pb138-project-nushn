import { z } from 'zod';

export const userIdSchema = z.object({
  userId: z.string().uuid().nonempty(),
}).strict();

export type UserIdType = z.infer<typeof userIdSchema>;
