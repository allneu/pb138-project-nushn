import { Request, Response } from 'express';

export const logout = async (req: Request, res: Response) => {
  try {
    req.session.destroy(() => {});
  } catch {
    throw new Error('Problem logging out');
  }
  res.json({ message: 'Logout' });
};

export default logout;
