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

export type TaskCreateResult = {
  id: string,
  taskName: string,
  dueDate: Date,
  content: string,
  creator: {
    id: string,
    username: string,
  },
  labelId: string,
  orderInList: number,
  orderInLabel: number,
  createdAt: Date,
};

export type TaskReturn = { // = getOneBody
  id: string,
  taskName: string,
  dueDate: Date,
  content: string,
  creator: {
    id: string,
    userName: string,
  },
  labelId: string,
  orderInList?: number,
  orderInLabel?: number,
};

export type TaskGetMultipleResult = {
  tasks: TaskReturn[],
};
