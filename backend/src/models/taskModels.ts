import { z } from 'zod';

export const taskCreateSchema = z.object({
  taskName: z.string().min(3),
  dueDate: z.date(),
  content: z.string(),
  creatorId: z.string().uuid().nonempty(),
  labelId: z.string().uuid(),
  image: z.string(),
}).strict();

export type TaskCreateType = z.infer<typeof taskCreateSchema>;

export type Creator = {
  id: string,
  username: string,
};

export type Task = {
  id: string,
  taskName: string,
  dueDate: Date,
  content: string,
  creator: Creator,
  labelId: string,
  orderInList: number | null,
  orderInLabel: number | null,
  createdAt: Date,
};

export type TaskGetMultipleResult = {
  tasks: Task[],
};

export const taskUpdateSchema = z.object({
  oldTaskName: z.string().min(3).optional(),
  oldDueDate: z.date().optional(),
  oldContent: z.string().optional(),
  oldLabelId: z.string().uuid().optional(),
  oldOrderInList: z.number().nonnegative().optional(),
  oldOrderInLabel: z.number().nonnegative().optional(),
  newTaskName: z.string().min(3).optional(),
  newDueDate: z.date().optional(),
  newContent: z.string().optional(),
  newLabelId: z.string().uuid().optional(),
  newOrderInList: z.number().nonnegative().optional(),
  newOrderInLabel: z.number().nonnegative().optional(),
}).strict()
  .refine(
    (data) => (
      (data.newTaskName !== undefined && data.oldTaskName !== undefined)
      || (data.newDueDate !== undefined && data.oldDueDate !== undefined)
      || (data.newContent !== undefined && data.oldContent !== undefined)
      || (data.newLabelId !== undefined && data.oldLabelId !== undefined)
      || (data.newOrderInLabel !== undefined && data.oldOrderInLabel !== undefined)
      || (data.newOrderInList !== undefined && data.oldOrderInList !== undefined)
    ),
    'At least one pair of taskName, dueDate, content, labelId, orderInLabel or orderInList must be provided.',
  );

export type TaskUpdateResult = { // return only id and updated data
  id: string,
  taskName?: string,
  dueDate?: Date,
  content?: string,
  labelId?: string,
  orderInList?: number,
  orderInLabel?: number,
};
