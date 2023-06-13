import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../../common/handleErrors';
import { functionalityNotImplemented } from '../../common/notimplemented';

// result code should be 201

// validation schema
const paramsSchema = z.object({
  userId: z.string().uuid(),
  subpageId: z.string().uuid(),
}).strict();

const bodySchema = z.object({
  role: z.enum(['owner', 'visitor']),
}).strict();

// res.body type
export interface ResultBody {
  userId: string,
  subpageId: string,
  role: string, // role enum
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
