import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { userLoginSchema } from '../../models/userModels';
import UserRepos from '../../repositories/user';
import { handleOkResp } from '../common/handleResponse';
import client from '../../repositories/client';
import log from '../common/log';

export const login = async (req: Request, res: Response) => {
  try {
    const data = userLoginSchema.parse(req.body);
    const response = await UserRepos.login(data);
    const userId = await client.user.findFirstOrThrow({
      where: { email: data.email },
      select: { id: true },
    });
    req.session.user = { id: userId.id };
    return response.isOk
      ? handleOkResp(200, response.value, res, `User with email ${data.email} logged in.`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};

export default login;
