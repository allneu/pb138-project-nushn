/* eslint-disable @typescript-eslint/semi */
import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { userLoginSchema } from '../../models/userModels';
import UserRepos from '../../repositories/user';
import { handleErrResp, handleOkResp } from '../common/handleResponse';

export const login = async (req: Request, res: Response) => {
  try {
    const data = userLoginSchema.parse(req.body);
    const response = await UserRepos.login(data);
    req.session.user = { email: data.email }
    return response.isOk
      ? handleOkResp(200, response.value, res, `User with email ${data.email} logged in.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export default login;
