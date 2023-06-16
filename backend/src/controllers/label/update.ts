import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import LabelRepostiory from '../../repositories/label';

// result code should be 201

// validation schema
const paramsSchema = z.object({
  labelId: z.string().uuid(),
  subpageId: z.string().uuid(),
}).strict();

const bodySchema = z.object({
  oldName: z.string().min(3).optional(),
  oldOrderInSubpage: z.number().nonnegative().optional(),
  newName: z.string().min(3).optional(),
  newOrderInSubpage: z.number().nonnegative().optional(),
}).strict()
  .refine(
    (data) => (
      (data.newName !== undefined && data.oldName !== undefined)
      || (data.newOrderInSubpage !== undefined && data.oldOrderInSubpage !== undefined)
    ),
    'At least one pair of name, description or icon must be provided.',
  );

export type UpdateLabelData = {
  labelId: string,
  subpageId: string,
  oldName?: string,
  oldOrderInSubpage?: number,
  newName?: string,
  newOrderInSubpage?: number,
};
// res.body type
export interface LabelUpdateResultBody { // return only id and updated data
  id: string,
  name?: string,
  orderInSubpage?: number,
}

// function
export const update = async (req: Request, res: Response) => {
  try {
    paramsSchema.parse(req.params);
    bodySchema.parse(req.body);
    const args = { ...req.body, ...req.params };
    return await LabelRepostiory.update(args).then((r) => {
      const result = r.unwrap();
      res.status(200).send(result);
    });
  } catch (e) {
    return handleErrors(e, res);
  }
};
