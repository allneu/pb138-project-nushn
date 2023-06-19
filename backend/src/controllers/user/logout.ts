import { Request, Response } from 'express';

export const logout = async (req: Request, res: Response) => {
  req.session.destroy(() => {});
  res.json({ message: 'Logout' });
};

export default logout;
