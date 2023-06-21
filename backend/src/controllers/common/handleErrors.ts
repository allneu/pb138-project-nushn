import { ZodError } from 'zod';
import type { Response } from 'express';
import { notimplementedError } from '../../models';
import { handleErrResp } from './handleResponse';

const handleErrors = (e: unknown, res: Response) => {
  if (e instanceof ZodError) {
    const failResponse = {
      status: 'failure',
      data: e,
      error: 'Validation failed!',
    };
    return res.status(400).send(failResponse);
  }

  if (e === notimplementedError) {
    return handleErrResp(501, e, res, 'Not implemented!');
  }

  return handleErrResp(500, e, res, 'An error occurred');
};

export default handleErrors;
