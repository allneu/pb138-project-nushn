import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import LabelRepostiory from '../../repositories/label';

// result code should be 201

// validation schema
const bodySchema = z.object({
  name: z.string().min(3),
}).strict();

const paramsSchema = z.object({
  subpageId: z.string().uuid().nonempty(),
}).strict();

// type to create Label
export type LabelDataCreate = {
  name: string,
  subpageId: string
};

// res.body type
export type LabelResultBody = {
  id: string,
  name: string,
  orderInSubpage: number,
  createdAt: Date,
};

// function
export const create = async (req: Request, res: Response) => {
  try {
    bodySchema.parse(req.body);
    paramsSchema.parse(req.params);
    const args = { ...req.params, ...req.body };
    return await LabelRepostiory.create(args).then((r) => {
      const result = r.unwrap();
      res.status(201).send({ data: result });
    });
  } catch (e) {
    return handleErrors(e, res);
  }
};
