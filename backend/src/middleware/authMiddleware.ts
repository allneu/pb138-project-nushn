import { Request, Response, NextFunction } from 'express';

const auth = () => (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
  return 'OK';
};

export default auth;
