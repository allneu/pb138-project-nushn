import type { Request, Response } from 'express';

export const endpointNotImplemented = async (req: Request, res: Response) => {
  res.status(501).send({
    status: 'failure!',
    params: req.params,
    body: req.body,
    error: 'Functionality on this endpoint has not been implemented!',
  });
};

export const functionalityNotImplemented = async (req: Request, res: Response) => {
  res.status(501).send({
    status: 'failure!',
    params: req.params,
    body: req.body,
    error: 'The functionality has not been implemented!',
  });
};
