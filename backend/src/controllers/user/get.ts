import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { userIdSchema } from '../../models/urlParamsSchema';
import UserRepos from '../../repositories/user';
import { handleErrResp, handleOkResp } from '../common/handleResponse';
import { userGetMultipleSchema } from '../../models/userModels';

// TODO:
// add get by params - username?
// add pagination

// functions
export const getOne = async (req: Request, res: Response) => {
  try {
    const params = userIdSchema.parse(req.params);
    const response = await UserRepos.getOne(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Listed user with id: ${params.userId}.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};

export const getMultiple = async (req: Request, res: Response) => {
  try {
    const data = userGetMultipleSchema.parse(req.body);
    const response = await UserRepos.getMultiple(data);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Listed first ${data.count} user theirs username contain: ${data.username}.`)
      : handleErrResp(500, response.error, res, response.error.message);
  } catch (e) {
    return handleErrors(e, res);
  }
};
