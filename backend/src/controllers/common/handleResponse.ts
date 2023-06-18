import type { Response } from 'express';

export const handleOkResp = (
  status: number,
  data: object,
  res: Response,
  msg: string,
): Response => res.status(status).send({
  status: 'success',
  data,
  message: msg,
});

export const handleErrResp = (
  status: number,
  data: unknown,
  res: Response,
  msg: string,
): Response => res.status(status).send({
  status: 'failure',
  data,
  message: msg,
});
