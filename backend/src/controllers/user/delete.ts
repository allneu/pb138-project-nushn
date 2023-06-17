import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';

// result code should be 204

// validation schema
const paramsSchema = z.object({
  userId: z.string().uuid(),
}).strict();

// res.body type
// {}

export type UserDeleteData = {
  userId: string,
};

// function
const deleteUser = async (req: Request, res: Response) => {
  try {
    paramsSchema.parse(req.params);
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export default deleteUser;
