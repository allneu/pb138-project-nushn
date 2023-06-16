import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import LabelRepostiory from '../../repositories/label';

// result code should be 204

// validation schema
const paramsSchema = z.object({
  labelId: z.string().uuid().nonempty(),
  subpageId: z.string().uuid().nonempty(),
}).strict();

export type LabelDataDelete = {
  labelId: string,
  subpageId: string
};

// res.body type
// {}

// function
export const deleteLabel = async (req: Request, res: Response) => {
  try {
    paramsSchema.parse(req.params);
    const args = { ...req.body, ...req.params };
    return await LabelRepostiory.deleteLabel(args).then((r) => {
      const result = r.unwrap();
      res.status(204).send(result);
    });
  } catch (e) {
    return handleErrors(e, res);
  }
};
