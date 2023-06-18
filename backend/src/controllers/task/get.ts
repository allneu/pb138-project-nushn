import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';

// validation schema
const paramsSchemaOne = z.object({
  taskId: z.string().uuid(),
  subPageId: z.string().uuid(),
}).strict();

const paramsSchemaMultiple = z.object({
  subpageId: z.string().uuid(),
}).strict();

export type TaskGetData = {
  taskId: string,
  subpageId: string,
};

export type TaskGetMultipleBody = {
  subpageId:string,
};

// res.body type
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
