import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import UserRepos from '../../repositories/user';
import { handleErrResp, handleOkResp } from '../common/handleResponse';

export const auth = async (req: Request, res: Response) => {
  try {
    const { id } = req.session;
    const response = await UserRepos.auth(id);
    return response.isOk
      ? handleOkResp(200, response.value, res, `User with email ${response.value.email} is authorized.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export default auth;
