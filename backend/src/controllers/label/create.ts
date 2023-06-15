import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';

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
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};
