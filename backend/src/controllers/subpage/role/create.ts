import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../../common/handleErrors';
import { functionalityNotImplemented } from '../../common/notimplemented';

// result code should be 201

// validation schema
const bodySchema = z.object({
  role: z.enum(['owner', 'visitor']),
}).strict();

const paramsSchema = z.object({
  userId: z.string().uuid().nonempty(),
  subpageId: z.string().uuid().nonempty(),
}).strict();

// res.body type
export interface ResultBody {
  userId: string,
  subpageId: string,
  role: string, // role enum
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
