import { z } from 'zod';
import differenceInDays from 'date-fns/differenceInDays';

export const taskFormSchema = z.object({
  taskName: z.string().min(3, 'Name must be at least 3 characters'),
  content: z.string(),
  labelId: z.string().uuid('Task must have a label'),
  dueDate: z.string().refine(
    (dateString) => differenceInDays(new Date(dateString), new Date()) >= 0,
    'Deadline must be today or later',
  ),
});

export type TaskFormDataType = z.infer<typeof taskFormSchema>;
