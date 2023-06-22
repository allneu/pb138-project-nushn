import { z } from 'zod';

export const taskCreateSchema = z.object({
  taskName: z.string().min(3),
  dueDate: z.string(),
  content: z.string(),
  creatorId: z.string().uuid().nonempty(),
  labelId: z.string().uuid().optional(),
  image: z.string().optional(),
}).strict();

export type TaskCreateType = z.infer<typeof taskCreateSchema>;

export type Creator = {
  id: string,
  username: string,
};

export type Task = {
  id: string,
  taskName: string,
  dueDate: string,
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
  oldDueDate: z.string().optional(),
  oldContent: z.string().optional(),
  oldDone: z.boolean().optional(),
  oldLabelId: z.string().uuid().optional(),
  oldOrderInList: z.number().nonnegative().optional(),
  oldOrderInLabel: z.number().nonnegative().optional(),
  newTaskName: z.string().min(3).optional(),
  newDueDate: z.string().optional(),
  newContent: z.string().optional(),
  newDone: z.boolean().optional(),
  newLabelId: z.string().uuid().optional(),
  newOrderInList: z.number().nonnegative().optional(),
  newOrderInLabel: z.number().nonnegative().optional(),
}).strict()
  .refine(
    (data) => (
      (data.newTaskName !== undefined && data.oldTaskName !== undefined)
      || (data.newDueDate !== undefined && data.oldDueDate !== undefined)
      || (data.newContent !== undefined && data.oldContent !== undefined)
      || (data.newDone !== undefined && data.oldDone !== undefined)
      || (data.newLabelId !== undefined && data.oldLabelId !== undefined)
      || (data.newOrderInLabel !== undefined && data.oldOrderInLabel !== undefined)
      || (data.newOrderInList !== undefined && data.oldOrderInList !== undefined)
    ),
    'At least one pair of taskName, dueDate, content, labelId, orderInLabel or orderInList must be provided.',
  )
  .refine(
    (data) => (
      (data.newDueDate === undefined || data.oldDueDate !== undefined)
      && (data.newContent === undefined || data.oldContent !== undefined)
      && (data.newTaskName === undefined || data.oldTaskName !== undefined)
      && (data.newDone === undefined || data.oldDone !== undefined)
      && (data.newLabelId === undefined || data.oldLabelId !== undefined)
      && (data.newOrderInLabel === undefined || data.oldOrderInLabel !== undefined)
      && (data.newOrderInList === undefined || data.oldOrderInList !== undefined)
    ),
    'For each new[] data are old[] data required!',
  );

export type TaskUpdateType = z.infer<typeof taskUpdateSchema>;

export type TaskUpdateResult = { // return only id and updated data
  id: string,
  taskName?: string,
  dueDate?: string,
  content?: string,
  done?: boolean,
  labelId?: string,
  orderInList?: number | null,
  orderInLabel?: number | null,
};

export type TaskDeleteResult = {
  taskId: string,
  labelId: string,
};
