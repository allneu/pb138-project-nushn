import type { Request, Response } from 'express';
import handleErrors from '../common/handleErrors';
import { userIdSchema } from '../../models/urlParamsSchema';
import UserRepos from '../../repositories/user';
import { handleOkResp } from '../common/handleResponse';
import { userGetMultipleSchema } from '../../models/userModels';
import log from '../common/log';

export const getOne = async (req: Request, res: Response) => {
  try {
    const params = userIdSchema.parse(req.params);
    const response = await UserRepos.getOne(params);
    return response.isOk
      ? handleOkResp(200, response.value, res, `Listed user with id: ${params.userId}.`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  }
};

export const getMultiple = async (req: Request, res: Response) => {
  try {
    const { count, username } = userGetMultipleSchema.parse(req.params);
    const response = await UserRepos.getMultiple({ count: Number(count), username: username ?? '' });
    return response.isOk
      ? handleOkResp(200, response.value, res, `Listed first ${count} user theirs username contain: ${username}.`)
      : handleErrors(response.error, res);
  } catch (e) {
    return handleErrors(e as Error, res);
  } finally {
    log(req, res);
  }
};
