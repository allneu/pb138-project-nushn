import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';

// result code should be 201

// validation schema
const bodySchema = z.object({
  taskName: z.string().nonempty().min(3),
  dueDate: z.date(),
  content: z.string(),
  creatorId: z.string().uuid().nonempty(),
  labelId: z.string().uuid(),
}).strict();

const paramsSchema = z.object({
  pageId: z.string().uuid(),
}).strict();

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
export const create = async (req: Request, res: Response) => {
  try {
    bodySchema.parse(req.body);
    paramsSchema.parse(req.params);
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};
