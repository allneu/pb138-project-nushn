import type { Request, Response } from 'express';
import { z } from 'zod';
import handleErrors from '../common/handleErrors';
import { functionalityNotImplemented } from '../common/notimplemented';

// validation schema
const paramsSchema = z.object({
  subpageId: z.string().uuid(),
}).strict();

export type LabelGetData = {
  subpageId: string,
};
// res.body type
export type LabelGetResultBody = {
  labels: [{
    id: string,
    name: string,
    orderInSubpage: number,
    createdAt: Date,
    tasks: [{
      id: string,
      taskName: string,
      dueDate: Date,
      content: string,
      creator: {
        id: string,
        username: string,
      },
      labelId: string,
      orderInList: number,
      orderInLabel: number,
      createdAt: Date,
    }],
  }],
};

// functions
export const get = async (req: Request, res: Response) => {
  try {
    paramsSchema.parse(req.params);
    return await functionalityNotImplemented(req, res);
  } catch (e) {
    return handleErrors(e, res);
  }
};
