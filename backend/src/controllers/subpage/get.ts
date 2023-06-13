import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';

// TODO: add param to choise result data

// validation schema
const paramsSchemaOne = z.object({
  userId: z.string().uuid(),
  subpageId: z.string().uuid(),
}).strict();

const paramsSchemaMultiple = z.object({
  userId: z.string().uuid(),
}).strict();

// res.body type
export interface Subpage { // = getOneBody
  id: string,
  name: string,
  description: string,
  icon: string,
  creator: {
    id: string,
    username: string,
  },
  createdAt: Date,
}

export interface GetMultipleBody {
  tasks: Subpage[],
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
