import { ZodError } from 'zod';
import type { Response } from 'express';

const handleErrors = (e: unknown, res: Response) => {
  if (e instanceof ZodError) {
    const failResponse = {
      status: 'failure',
      data: e,
      error: 'Validation failed!',
    };
    return res.status(400).send(failResponse);
  }

  const failResponse = {
    status: 'failure',
    data: {},
    error: 'An error occurred',
  };
  return res.status(500).send(failResponse);
};

export default handleErrors;
