import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';

// result code should be 201

// validation schema
const paramsSchema = z.object({
  userId: z.string().uuid(),
  subpageId: z.string().uuid(),
}).strict();

const bodySchema = z.object({
  oldName: z.string().min(3).optional(),
  oldDescription: z.string().nonempty().optional(),
  oldIcon: z.string().nonempty().optional(),
  newName: z.string().min(3).optional(),
  newDescription: z.string().nonempty().optional(),
  newIcon: z.string().nonempty().optional(),
}).strict()
  .refine(
    (data) => (
      (data.newName !== undefined && data.oldName !== undefined)
      || (data.newDescription !== undefined && data.oldDescription !== undefined)
      || (data.newIcon !== undefined && data.oldIcon !== undefined)
    ),
    'At least one pair of name, description or icon must be provided.',
  );

// res.body type
export interface ResultBody { // return only id and updated data
  id: string,
  name?: string,
  description?: string,
  icon?: string,
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
