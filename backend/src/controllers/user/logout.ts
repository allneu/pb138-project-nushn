import { Request, Response } from 'express';
import log from '../common/log';

export const logout = async (req: Request, res: Response) => {
  try {
    req.session.destroy(() => {});
    res.json({ message: 'Logout' });
  } catch {
    throw new Error('Problem logging out');
  } finally {
    log(req, res);
  }
};

export default logout;
