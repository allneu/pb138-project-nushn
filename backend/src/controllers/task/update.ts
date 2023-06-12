import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';

// result code should be 201

// validation schema
const paramsSchema = z.object({
  taskId: z.string().uuid(),
  pageId: z.string().uuid(),
}).strict();

const bodySchema = z.object({
  oldTaskName: z.string().nonempty().min(3).optional(),
  oldDueDate: z.date().optional(),
  oldContent: z.string().optional(),
  oldLabelId: z.string().uuid().optional(),
  oldOrderInList: z.number().nonnegative().optional(),
  oldOrderInLabel: z.number().nonnegative().optional(),
  newTaskName: z.string().nonempty().min(3).optional(),
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

// res.body type
export interface ResultBody {
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
}

// function
export const update = async (req: Request, res: Response) => {
  try {
    paramsSchema.parse(req.params);
    bodySchema.parse(req.body);
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};
