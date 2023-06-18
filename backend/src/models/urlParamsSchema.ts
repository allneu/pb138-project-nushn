import { z } from 'zod';

export const userIdSchema = z.object({
  userId: z.string().uuid().nonempty(),
}).strict();

export type UserIdType = z.infer<typeof userIdSchema>;

export const subpageIdSchema = z.object({
  subpageId: z.string().uuid().nonempty(),
}).strict();

export type SubpageIdType = z.infer<typeof subpageIdSchema>;

export const userIdSubpageIdSchema = z.object({
  userId: z.string().uuid().nonempty(),
  subpageId: z.string().uuid().nonempty(),
}).strict();

export type UserIdSubpageIdType = z.infer<typeof userIdSubpageIdSchema>;

export const labelIdSubpageIdSchema = z.object({
  labelId: z.string().uuid().nonempty(),
  subpageId: z.string().uuid().nonempty(),
}).strict();

export type LabelIdSubpageIdType = z.infer<typeof labelIdSubpageIdSchema>;

export const taskIdSubpageIdSchema = z.object({
  taskId: z.string().uuid().nonempty(),
  subpageId: z.string().uuid().nonempty(),
}).strict();

export type TaskIdSubpageIdType = z.infer<typeof taskIdSubpageIdSchema>;
