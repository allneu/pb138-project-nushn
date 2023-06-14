import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';

// validation schema
const paramsSchemaOne = z.object({
  taskId: z.string().uuid(),
  pageId: z.string().uuid(),
}).strict();

const paramsSchemaMultiple = z.object({
  subpageId: z.string().uuid(),
}).strict();

// res.body type
export interface Task { // = getOneBody
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

export interface GetMultipleBody {
  tasks: Task[],
}

// functions
export const getOne = async (req: Request, res: Response) => {
  try {
    paramsSchemaOne.parse(req.params);
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export const getMultiple = async (req: Request, res: Response) => {
  try {
    paramsSchemaMultiple.parse(req.params);
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};
