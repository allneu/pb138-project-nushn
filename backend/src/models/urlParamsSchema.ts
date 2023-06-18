import { z } from 'zod';

export const userIdSchema = z.object({
  userId: z.string().uuid().nonempty(),
}).strict();

export type UserIdType = z.infer<typeof userIdSchema>;

export const userIdSubpageIdSchema = z.object({
  userId: z.string().uuid().nonempty(),
  subpageId: z.string().uuid().nonempty(),
}).strict();

export type UserIdSubpageIdType = z.infer<typeof userIdSubpageIdSchema>;
