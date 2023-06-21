import type { Request, Response } from 'express';
import { logger } from '../../log/log';

const log = (req: Request, res: Response) => {
  logger.info({
    time: Date(),
    req: {
      method: req.method,
      url: req.url,
      body: req.body,
      params: req.params,
      query: req.query,
      session: req.session,
    },
    res: {
      status: res.statusCode,
      message: res.statusMessage,
    },
  });
};

export default log;
