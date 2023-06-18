import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';
import { taskIdSubpageIdSchema, taskUpdateSchema } from '../../models';

// result code should be 201

// function
const update = async (req: Request, res: Response) => {
  try {
    taskIdSubpageIdSchema.parse(req.params);
    taskUpdateSchema.parse(req.body);
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export default update;
