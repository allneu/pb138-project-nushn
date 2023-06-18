import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';
import { subpageIdSchema, taskIdSubpageIdSchema } from '../../models';

// functions
export const getOne = async (req: Request, res: Response) => {
  try {
    taskIdSubpageIdSchema.parse(req.params);
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export const getMultiple = async (req: Request, res: Response) => {
  try {
    subpageIdSchema.parse(req.params);
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};
