import { Request, Response, NextFunction } from 'express';
import client from '../repositories/client';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const params = { ...req.params };
  if (params['userId']) {
    try {
      if (params['userId'] !== req.session.user.id) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
    } catch {
      res.status(401).json({ message: 'Unauthorized' });
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
      return;
    }
  }
  next();
};

export default auth;
