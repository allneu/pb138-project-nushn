import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';

// TODO:
// add get by params - username?
// add pagination

// validation schema
const paramsSchema = z.object({
  userId: z.string().uuid(),
}).strict();

// res.body type
export interface User { // = getOneBody
  id: string,
  username: string,
  email: string,
}

export interface GetMultipleBody {
  users: User[],
}

// functions
export const getOne = async (req: Request, res: Response) => {
  try {
    paramsSchema.parse(req.params);
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export const getMultiple = async (req: Request, res: Response) => {
  try {
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};
