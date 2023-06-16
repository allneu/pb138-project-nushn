import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';

// result code should be 201

// validation schema
const bodySchema = z.object({
  taskName: z.string().min(3),
  dueDate: z.date(),
  content: z.string(),
  creatorId: z.string().uuid().nonempty(),
  labelId: z.string().uuid(),
}).strict();

const paramsSchema = z.object({
  subpageId: z.string().uuid(),
}).strict();

export type TaskCreateData = {
  taskName: string,
  dueDate: Date,
  content?: string,
  creatorId: string,
  labelId: string,
  image?: string,
};
// res.body type
export type TaskCreateResultBody = {
  id: string,
  taskName: string,
  dueDate: Date,
  content: string,
  creator: {
    id: string,
    userName: string,
  },
  labelId: string,
  orderInList: number,
  orderInLabel: number,
  createdAt: Date,
};

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
