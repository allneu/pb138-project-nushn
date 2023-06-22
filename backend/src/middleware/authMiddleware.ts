import { Request, Response, NextFunction } from 'express';
import client from '../repositories/client';
import logger from '../log/log';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  logger.debug({ login: 'start' });
  if (!req.session?.user) {
    res.status(401).json({ message: 'Unauthorized' });
    logger.debug({ login: 'error 1' });
    return;
  }
  const params = { ...req.params };
  if (params['userId']) {
    try {
      if (params['userId'] !== req.session.user.id) {
        res.status(401).json({ message: 'Unauthorized' });
        logger.debug({ login: 'error 2' });
        return;
      }
    } catch {
      res.status(401).json({ message: 'Unauthorized' });
      logger.debug({ login: 'error 3' });
      return;
    }
  }
  if (params['subpageId']) {
    try {
      await client.role.findFirstOrThrow({
        where: {
          subpageId: params['subpageId'],
          deletedAt: null,
          userId: req.session.user.id,
        },
      });
    } catch {
      res.status(401).json({ message: 'Unauthorized' });
      logger.debug({ login: 'error 4' });
      return;
    }
  }
  logger.debug({ login: 'successfull done' });
  next();
};

export default auth;
